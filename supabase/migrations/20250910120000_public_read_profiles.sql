-- Allow public (anon) read access to selected tables
-- Profiles: public read-only (be cautious with exposed fields)
CREATE POLICY "Anyone can view profiles (public read)"
ON public.profiles
FOR SELECT
USING (true);

-- Ensure services/projects remain publicly readable
CREATE POLICY "Anyone can view services (public read reaffirm)"
ON public.services
FOR SELECT
USING (true);

CREATE POLICY "Anyone can view projects (public read reaffirm)"
ON public.projects
FOR SELECT
USING (true);

-- Blogs: only published visible to public
CREATE POLICY "Anyone can view published blogs (public read reaffirm)"
ON public.blogs
FOR SELECT
USING (published = true);

-- Hire requests: keep insert open to public (reaffirm)
CREATE POLICY "Anyone can insert hire requests (public submit reaffirm)"
ON public.hire_requests
FOR INSERT
WITH CHECK (true); 