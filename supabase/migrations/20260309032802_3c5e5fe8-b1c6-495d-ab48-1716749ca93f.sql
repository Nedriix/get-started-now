
-- Create timestamp update function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- pricing_categories
CREATE TABLE public.pricing_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.pricing_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read pricing_categories" ON public.pricing_categories FOR SELECT USING (true);

-- pricing_items
CREATE TABLE public.pricing_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID NOT NULL REFERENCES public.pricing_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  price TEXT NOT NULL,
  details TEXT,
  featured BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.pricing_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read pricing_items" ON public.pricing_items FOR SELECT USING (true);

-- vehicles
CREATE TABLE public.vehicles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  category TEXT NOT NULL,
  badge TEXT,
  image_url TEXT,
  highlight BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 0,
  features TEXT[] NOT NULL DEFAULT '{}',
  groups TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read vehicles" ON public.vehicles FOR SELECT USING (true);

-- news
CREATE TABLE public.news (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  publish_date DATE NOT NULL DEFAULT CURRENT_DATE,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read active news" ON public.news FOR SELECT USING (active = true);
CREATE TRIGGER update_news_updated_at BEFORE UPDATE ON public.news FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- site_settings
CREATE TABLE public.site_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read site_settings" ON public.site_settings FOR SELECT USING (true);

-- Vehicle images storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('vehicle-images', 'vehicle-images', true);
CREATE POLICY "Anyone can view vehicle images" ON storage.objects FOR SELECT USING (bucket_id = 'vehicle-images');
CREATE POLICY "Authenticated users can upload vehicle images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'vehicle-images' AND auth.role() = 'authenticated');
