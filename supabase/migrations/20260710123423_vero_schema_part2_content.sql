
/*
# VERO Platform Schema - Part 2: Content Tables
Creates gallery, videos, documents, plans, downloads, interactive_experiences, timeline_events, notifications, settings tables
*/

CREATE TABLE IF NOT EXISTS gallery (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  title text,
  description text,
  file_url text NOT NULL,
  file_name text,
  file_size bigint,
  mime_type text,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "gallery_admin_select" ON gallery;
CREATE POLICY "gallery_admin_select" ON gallery FOR SELECT TO authenticated
  USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

DROP POLICY IF EXISTS "gallery_admin_insert" ON gallery;
CREATE POLICY "gallery_admin_insert" ON gallery FOR INSERT TO authenticated
  WITH CHECK ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

DROP POLICY IF EXISTS "gallery_admin_update" ON gallery;
CREATE POLICY "gallery_admin_update" ON gallery FOR UPDATE TO authenticated
  USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin')
  WITH CHECK ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

DROP POLICY IF EXISTS "gallery_admin_delete" ON gallery;
CREATE POLICY "gallery_admin_delete" ON gallery FOR DELETE TO authenticated
  USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

DROP POLICY IF EXISTS "gallery_client_select" ON gallery;
CREATE POLICY "gallery_client_select" ON gallery FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM project_users pu WHERE pu.project_id = gallery.project_id AND pu.user_id = auth.uid()));

CREATE TABLE IF NOT EXISTS videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  title text,
  description text,
  file_url text NOT NULL,
  thumbnail_url text,
  file_name text,
  file_size bigint,
  duration_seconds integer,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "videos_admin_select" ON videos;
CREATE POLICY "videos_admin_select" ON videos FOR SELECT TO authenticated
  USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

DROP POLICY IF EXISTS "videos_admin_insert" ON videos;
CREATE POLICY "videos_admin_insert" ON videos FOR INSERT TO authenticated
  WITH CHECK ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

DROP POLICY IF EXISTS "videos_admin_update" ON videos;
CREATE POLICY "videos_admin_update" ON videos FOR UPDATE TO authenticated
  USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin')
  WITH CHECK ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

DROP POLICY IF EXISTS "videos_admin_delete" ON videos;
CREATE POLICY "videos_admin_delete" ON videos FOR DELETE TO authenticated
  USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

DROP POLICY IF EXISTS "videos_client_select" ON videos;
CREATE POLICY "videos_client_select" ON videos FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM project_users pu WHERE pu.project_id = videos.project_id AND pu.user_id = auth.uid()));

CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  file_url text NOT NULL,
  file_name text,
  file_size bigint,
  category text DEFAULT 'general',
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "documents_admin_select" ON documents;
CREATE POLICY "documents_admin_select" ON documents FOR SELECT TO authenticated
  USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

DROP POLICY IF EXISTS "documents_admin_insert" ON documents;
CREATE POLICY "documents_admin_insert" ON documents FOR INSERT TO authenticated
  WITH CHECK ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

DROP POLICY IF EXISTS "documents_admin_update" ON documents;
CREATE POLICY "documents_admin_update" ON documents FOR UPDATE TO authenticated
  USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin')
  WITH CHECK ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

DROP POLICY IF EXISTS "documents_admin_delete" ON documents;
CREATE POLICY "documents_admin_delete" ON documents FOR DELETE TO authenticated
  USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

DROP POLICY IF EXISTS "documents_client_select" ON documents;
CREATE POLICY "documents_client_select" ON documents FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM project_users pu WHERE pu.project_id = documents.project_id AND pu.user_id = auth.uid()));

CREATE TABLE IF NOT EXISTS plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  file_url text NOT NULL,
  file_name text,
  floor_level text,
  plan_type text DEFAULT 'floor_plan',
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE plans ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "plans_admin_select" ON plans;
CREATE POLICY "plans_admin_select" ON plans FOR SELECT TO authenticated
  USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

DROP POLICY IF EXISTS "plans_admin_insert" ON plans;
CREATE POLICY "plans_admin_insert" ON plans FOR INSERT TO authenticated
  WITH CHECK ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

DROP POLICY IF EXISTS "plans_admin_update" ON plans;
CREATE POLICY "plans_admin_update" ON plans FOR UPDATE TO authenticated
  USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin')
  WITH CHECK ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

DROP POLICY IF EXISTS "plans_admin_delete" ON plans;
CREATE POLICY "plans_admin_delete" ON plans FOR DELETE TO authenticated
  USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

DROP POLICY IF EXISTS "plans_client_select" ON plans;
CREATE POLICY "plans_client_select" ON plans FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM project_users pu WHERE pu.project_id = plans.project_id AND pu.user_id = auth.uid()));

CREATE TABLE IF NOT EXISTS downloads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  file_url text NOT NULL,
  file_name text,
  file_size bigint,
  file_type text,
  category text DEFAULT 'general',
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE downloads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "downloads_admin_select" ON downloads;
CREATE POLICY "downloads_admin_select" ON downloads FOR SELECT TO authenticated
  USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

DROP POLICY IF EXISTS "downloads_admin_insert" ON downloads;
CREATE POLICY "downloads_admin_insert" ON downloads FOR INSERT TO authenticated
  WITH CHECK ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

DROP POLICY IF EXISTS "downloads_admin_update" ON downloads;
CREATE POLICY "downloads_admin_update" ON downloads FOR UPDATE TO authenticated
  USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin')
  WITH CHECK ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

DROP POLICY IF EXISTS "downloads_admin_delete" ON downloads;
CREATE POLICY "downloads_admin_delete" ON downloads FOR DELETE TO authenticated
  USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

DROP POLICY IF EXISTS "downloads_client_select" ON downloads;
CREATE POLICY "downloads_client_select" ON downloads FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM project_users pu WHERE pu.project_id = downloads.project_id AND pu.user_id = auth.uid()));

CREATE TABLE IF NOT EXISTS interactive_experiences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  experience_type text NOT NULL DEFAULT 'pixel_streaming' CHECK (experience_type IN ('pixel_streaming', 'executable', 'vr', 'web')),
  url text,
  file_url text,
  file_name text,
  file_size bigint,
  platform text,
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE interactive_experiences ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "interactive_admin_select" ON interactive_experiences;
CREATE POLICY "interactive_admin_select" ON interactive_experiences FOR SELECT TO authenticated
  USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

DROP POLICY IF EXISTS "interactive_admin_insert" ON interactive_experiences;
CREATE POLICY "interactive_admin_insert" ON interactive_experiences FOR INSERT TO authenticated
  WITH CHECK ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

DROP POLICY IF EXISTS "interactive_admin_update" ON interactive_experiences;
CREATE POLICY "interactive_admin_update" ON interactive_experiences FOR UPDATE TO authenticated
  USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin')
  WITH CHECK ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

DROP POLICY IF EXISTS "interactive_admin_delete" ON interactive_experiences;
CREATE POLICY "interactive_admin_delete" ON interactive_experiences FOR DELETE TO authenticated
  USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

DROP POLICY IF EXISTS "interactive_client_select" ON interactive_experiences;
CREATE POLICY "interactive_client_select" ON interactive_experiences FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM project_users pu WHERE pu.project_id = interactive_experiences.project_id AND pu.user_id = auth.uid()));

CREATE TABLE IF NOT EXISTS timeline_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  event_date date NOT NULL,
  status text DEFAULT 'upcoming' CHECK (status IN ('completed', 'in_progress', 'upcoming')),
  milestone_type text DEFAULT 'general',
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE timeline_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "timeline_admin_select" ON timeline_events;
CREATE POLICY "timeline_admin_select" ON timeline_events FOR SELECT TO authenticated
  USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

DROP POLICY IF EXISTS "timeline_admin_insert" ON timeline_events;
CREATE POLICY "timeline_admin_insert" ON timeline_events FOR INSERT TO authenticated
  WITH CHECK ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

DROP POLICY IF EXISTS "timeline_admin_update" ON timeline_events;
CREATE POLICY "timeline_admin_update" ON timeline_events FOR UPDATE TO authenticated
  USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin')
  WITH CHECK ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

DROP POLICY IF EXISTS "timeline_admin_delete" ON timeline_events;
CREATE POLICY "timeline_admin_delete" ON timeline_events FOR DELETE TO authenticated
  USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

DROP POLICY IF EXISTS "timeline_client_select" ON timeline_events;
CREATE POLICY "timeline_client_select" ON timeline_events FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM project_users pu WHERE pu.project_id = timeline_events.project_id AND pu.user_id = auth.uid()));

CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  title text NOT NULL,
  message text,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "notifications_select_own" ON notifications;
CREATE POLICY "notifications_select_own" ON notifications FOR SELECT TO authenticated
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "notifications_update_own" ON notifications;
CREATE POLICY "notifications_update_own" ON notifications FOR UPDATE TO authenticated
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "notifications_delete_own" ON notifications;
CREATE POLICY "notifications_delete_own" ON notifications FOR DELETE TO authenticated
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "notifications_admin_insert" ON notifications;
CREATE POLICY "notifications_admin_insert" ON notifications FOR INSERT TO authenticated
  WITH CHECK ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

CREATE TABLE IF NOT EXISTS settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  key text NOT NULL,
  value jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE (user_id, key)
);

ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "settings_select_own" ON settings;
CREATE POLICY "settings_select_own" ON settings FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR user_id IS NULL);

DROP POLICY IF EXISTS "settings_insert_own" ON settings;
CREATE POLICY "settings_insert_own" ON settings FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "settings_update_own" ON settings;
CREATE POLICY "settings_update_own" ON settings FOR UPDATE TO authenticated
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "settings_delete_own" ON settings;
CREATE POLICY "settings_delete_own" ON settings FOR DELETE TO authenticated
  USING (user_id = auth.uid());

CREATE INDEX IF NOT EXISTS idx_gallery_project ON gallery(project_id);
CREATE INDEX IF NOT EXISTS idx_videos_project ON videos(project_id);
CREATE INDEX IF NOT EXISTS idx_documents_project ON documents(project_id);
CREATE INDEX IF NOT EXISTS idx_plans_project ON plans(project_id);
CREATE INDEX IF NOT EXISTS idx_downloads_project ON downloads(project_id);
CREATE INDEX IF NOT EXISTS idx_timeline_project ON timeline_events(project_id);
CREATE INDEX IF NOT EXISTS idx_interactive_project ON interactive_experiences(project_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'client')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
