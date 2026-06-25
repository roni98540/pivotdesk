-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ========================
-- PROFILES
-- ========================
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique not null,
  full_name text not null,
  avatar_url text,
  bio text,
  years_experience text,
  trading_style text,
  badge text check (badge in ('Top Contributor', 'Verified Trader', 'Moderator')),
  win_rate numeric(5,2),
  post_count integer default 0,
  follower_count integer default 0,
  is_approved boolean default false,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Public profiles are viewable by approved members"
  on profiles for select
  using (auth.uid() in (select id from profiles where is_approved = true));

create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = id);

-- ========================
-- APPLICATIONS
-- ========================
create table public.applications (
  id uuid default uuid_generate_v4() primary key,
  email text not null,
  full_name text not null,
  years_experience text not null,
  avg_hold_time text not null,
  trading_style text not null,
  edge_description text not null,
  worst_mistake text not null,
  track_record text,
  status text default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz default now()
);

alter table public.applications enable row level security;

create policy "Anyone can submit application"
  on applications for insert
  with check (true);

create policy "Only moderators can view applications"
  on applications for select
  using (auth.uid() in (select id from profiles where badge = 'Moderator'));

-- ========================
-- POSTS
-- ========================
create table public.posts (
  id uuid default uuid_generate_v4() primary key,
  author_id uuid references public.profiles(id) on delete cascade not null,
  ticker text not null,
  direction text not null check (direction in ('Long', 'Short')),
  setup_type text not null,
  entry numeric(10,2),
  stop numeric(10,2),
  target numeric(10,2),
  rr_ratio numeric(5,2) generated always as (
    case
      when entry is not null and stop is not null and target is not null and entry != stop
      then round(abs(target - entry) / abs(entry - stop), 2)
      else null
    end
  ) stored,
  body text not null,
  tags text[] default '{}',
  like_count integer default 0,
  comment_count integer default 0,
  created_at timestamptz default now()
);

alter table public.posts enable row level security;

create policy "Approved members can view posts"
  on posts for select
  using (auth.uid() in (select id from profiles where is_approved = true));

create policy "Approved members can create posts"
  on posts for insert
  with check (auth.uid() in (select id from profiles where is_approved = true));

create policy "Authors can update own posts"
  on posts for update
  using (auth.uid() = author_id);

create policy "Authors can delete own posts"
  on posts for delete
  using (auth.uid() = author_id);

-- ========================
-- LIKES
-- ========================
create table public.likes (
  user_id uuid references public.profiles(id) on delete cascade,
  post_id uuid references public.posts(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (user_id, post_id)
);

alter table public.likes enable row level security;

create policy "Approved members can like"
  on likes for all
  using (auth.uid() in (select id from profiles where is_approved = true));

-- Update like_count on posts
create or replace function update_like_count()
returns trigger language plpgsql as $$
begin
  if tg_op = 'INSERT' then
    update posts set like_count = like_count + 1 where id = new.post_id;
  elsif tg_op = 'DELETE' then
    update posts set like_count = like_count - 1 where id = old.post_id;
  end if;
  return null;
end;
$$;

create trigger on_like_change
  after insert or delete on likes
  for each row execute function update_like_count();

-- ========================
-- BOOKMARKS
-- ========================
create table public.bookmarks (
  user_id uuid references public.profiles(id) on delete cascade,
  post_id uuid references public.posts(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (user_id, post_id)
);

alter table public.bookmarks enable row level security;

create policy "Users manage own bookmarks"
  on bookmarks for all
  using (auth.uid() = user_id);

-- ========================
-- COMMENTS
-- ========================
create table public.comments (
  id uuid default uuid_generate_v4() primary key,
  post_id uuid references public.posts(id) on delete cascade not null,
  author_id uuid references public.profiles(id) on delete cascade not null,
  body text not null,
  created_at timestamptz default now()
);

alter table public.comments enable row level security;

create policy "Approved members can view comments"
  on comments for select
  using (auth.uid() in (select id from profiles where is_approved = true));

create policy "Approved members can comment"
  on comments for insert
  with check (auth.uid() in (select id from profiles where is_approved = true));

-- Update comment_count on posts
create or replace function update_comment_count()
returns trigger language plpgsql as $$
begin
  if tg_op = 'INSERT' then
    update posts set comment_count = comment_count + 1 where id = new.post_id;
  elsif tg_op = 'DELETE' then
    update posts set comment_count = comment_count - 1 where id = old.post_id;
  end if;
  return null;
end;
$$;

create trigger on_comment_change
  after insert or delete on comments
  for each row execute function update_comment_count();

-- ========================
-- FOLLOWS
-- ========================
create table public.follows (
  follower_id uuid references public.profiles(id) on delete cascade,
  following_id uuid references public.profiles(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (follower_id, following_id),
  check (follower_id != following_id)
);

alter table public.follows enable row level security;

create policy "Approved members can follow"
  on follows for all
  using (auth.uid() in (select id from profiles where is_approved = true));

-- ========================
-- AUTO-CREATE PROFILE ON SIGNUP
-- ========================
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, username, full_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
