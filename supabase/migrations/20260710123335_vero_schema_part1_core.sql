
/*
# VERO Platform Schema - Part 1: Core Tables
Creates profiles, projects, project_codes, project_users tables
*/

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  role text NOT NULL DEFAULT 'client' CHECK (role IN ('admin', 'client')),
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "profiles_select_own" ON profiles;
CREATE POLICY "profiles_select_own" ON profiles FOR SELECT
  TO authenticated USING (auth.uid() = id);

DROP POLICY IF EXISTS "profiles_insert_own" ON profiles;
CREATE POLICY "profiles_insert_own" ON profiles FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "profiles_update_own" ON profiles;
CREATE POLICY "profiles_update_own" ON profiles FOR UPDATE
  TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "profiles_delete_own" ON profiles;
CREATE POLICY "profiles_delete_own" ON profiles FOR DELETE
  TO authenticated USING (auth.uid() = id);

DROP POLICY IF EXISTS "profiles_admin_select_all" ON profiles;
CREATE POLICY "profiles_admin_select_all" ON profiles FOR SELECT
  TO authenticated USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  location text,
  architect text,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'archived', 'draft')),
  cover_image_url text,
  completion_date date,
  area_sqm numeric,
  project_type text,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "projects_admin_select" ON projects;
CREATE POLICY "projects_admin_select" ON projects FOR SELECT
  TO authenticated USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

DROP POLICY IF EXISTS "projects_admin_insert" ON projects;
CREATE POLICY "projects_admin_insert" ON projects FOR INSERT
  TO authenticated WITH CHECK (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

DROP POLICY IF EXISTS "projects_admin_update" ON projects;
CREATE POLICY "projects_admin_update" ON projects FOR UPDATE
  TO authenticated USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  ) WITH CHECK (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

DROP POLICY IF EXISTS "projects_admin_delete" ON projects;
CREATE POLICY "projects_admin_delete" ON projects FOR DELETE
  TO authenticated USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

CREATE TABLE IF NOT EXISTS project_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE (project_id, user_id)
);

ALTER TABLE project_users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "project_users_admin_all" ON project_users;
CREATE POLICY "project_users_admin_all" ON project_users FOR SELECT
  TO authenticated USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

DROP POLICY IF EXISTS "project_users_admin_insert" ON project_users;
CREATE POLICY "project_users_admin_insert" ON project_users FOR INSERT
  TO authenticated WITH CHECK (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

DROP POLICY IF EXISTS "project_users_admin_update" ON project_users;
CREATE POLICY "project_users_admin_update" ON project_users FOR UPDATE
  TO authenticated USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  ) WITH CHECK (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

DROP POLICY IF EXISTS "project_users_admin_delete" ON project_users;
CREATE POLICY "project_users_admin_delete" ON project_users FOR DELETE
  TO authenticated USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

DROP POLICY IF EXISTS "project_users_client_select" ON project_users;
CREATE POLICY "project_users_client_select" ON project_users FOR SELECT
  TO authenticated USING (user_id = auth.uid());

DROP POLICY IF EXISTS "projects_client_select" ON projects;
CREATE POLICY "projects_client_select" ON projects FOR SELECT
  TO authenticated USING (
    EXISTS (
      SELECT 1 FROM project_users pu
      WHERE pu.project_id = id AND pu.user_id = auth.uid()
    )
  );

CREATE TABLE IF NOT EXISTS project_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  code text UNIQUE NOT NULL,
  is_active boolean DEFAULT true,
  expires_at timestamptz,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE project_codes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "project_codes_admin_select" ON project_codes;
CREATE POLICY "project_codes_admin_select" ON project_codes FOR SELECT
  TO authenticated USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

DROP POLICY IF EXISTS "project_codes_admin_insert" ON project_codes;
CREATE POLICY "project_codes_admin_insert" ON project_codes FOR INSERT
  TO authenticated WITH CHECK (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

DROP POLICY IF EXISTS "project_codes_admin_update" ON project_codes;
CREATE POLICY "project_codes_admin_update" ON project_codes FOR UPDATE
  TO authenticated USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  ) WITH CHECK (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

DROP POLICY IF EXISTS "project_codes_admin_delete" ON project_codes;
CREATE POLICY "project_codes_admin_delete" ON project_codes FOR DELETE
  TO authenticated USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

DROP POLICY IF EXISTS "project_codes_anon_select" ON project_codes;
CREATE POLICY "project_codes_anon_select" ON project_codes FOR SELECT
  TO anon, authenticated USING (is_active = true);

CREATE INDEX IF NOT EXISTS idx_project_users_user ON project_users(user_id);
CREATE INDEX IF NOT EXISTS idx_project_users_project ON project_users(project_id);
CREATE INDEX IF NOT EXISTS idx_project_codes_code ON project_codes(code);
