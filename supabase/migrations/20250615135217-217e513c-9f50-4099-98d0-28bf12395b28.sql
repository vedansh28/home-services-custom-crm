
-- 1. Create a user profile table linked to auth.users
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  username text UNIQUE,
  first_name text,
  last_name text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Automatically create a profile on user signup (email for username)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, username)
  VALUES (NEW.id, NEW.email)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 2. Enum for roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- 3. Table mapping user ids to roles (can have only one for now)
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

-- 4. Add RLS to profiles and user_roles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Only owner can select/update their profile
CREATE POLICY "User can view own profile" ON public.profiles
FOR SELECT USING (auth.uid() = id);
CREATE POLICY "User can update own profile" ON public.profiles
FOR UPDATE USING (auth.uid() = id);

-- Anyone can insert via handle_new_user trigger
CREATE POLICY "Allow insert by trigger" ON public.profiles
FOR INSERT WITH CHECK (true);

-- Role policies: only owner can view their roles
CREATE POLICY "User can view own role" ON public.user_roles
FOR SELECT USING (auth.uid() = user_id);

-- Only admins can invite (we’ll use custom logic in app, enforced by this mapping)

-- Helper function: check if user is admin, using SECURITY DEFINER to avoid recursion
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
     WHERE user_id = _user_id AND role = _role
  );
$$;

-- 5. SEED: Add an initial admin user
-- After you create the first user in the Supabase dashboard, run:
-- (replace 'FIRST_ADMIN_USER_ID' with their auth.users.id)
-- INSERT INTO public.user_roles(user_id, role) VALUES ('FIRST_ADMIN_USER_ID', 'admin');
