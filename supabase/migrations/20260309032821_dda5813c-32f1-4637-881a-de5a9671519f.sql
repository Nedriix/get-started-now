
-- Create admin role enum and user_roles table
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);

-- is_admin RPC function
CREATE OR REPLACE FUNCTION public.is_admin(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = 'admin'
  )
$$;

-- Admin write policies for all content tables
CREATE POLICY "Admins can manage pricing_categories" ON public.pricing_categories
  FOR ALL USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can manage pricing_items" ON public.pricing_items
  FOR ALL USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can manage vehicles" ON public.vehicles
  FOR ALL USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can manage news" ON public.news
  FOR ALL USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can manage site_settings" ON public.site_settings
  FOR ALL USING (public.is_admin(auth.uid()));
