-- CREATE SCHEMA
CREATE SCHEMA IF NOT EXISTS xportfolio;

-- EXTENSION FOR UUID
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- PROFILES
DROP TABLE IF EXISTS xportfolio.profile CASCADE;
CREATE TABLE IF NOT EXISTS xportfolio.profile (
  id UUID PRIMARY KEY DEFAULT '00000000-0000-0000-0000-000000000001', -- There is only one profile
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  bio TEXT,
  profile_photo_url TEXT,
  cv_url TEXT,
  phone TEXT,
  whatsapp TEXT,
  email TEXT,
  linkedin TEXT,
  github TEXT,
  location TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- EDUCATION
DROP TABLE IF EXISTS xportfolio.education CASCADE;
CREATE TABLE IF NOT EXISTS xportfolio.education (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  degree TEXT NOT NULL,
  university TEXT NOT NULL,
  location TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- WORK EXPERIENCE
DROP TABLE IF EXISTS xportfolio.work_experience CASCADE;
CREATE TABLE IF NOT EXISTS xportfolio.work_experience (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  position TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT,
  start_date DATE NOT NULL,
  end_date DATE,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- PROJECTS
DROP TABLE IF EXISTS xportfolio.projects CASCADE;
CREATE TABLE IF NOT EXISTS xportfolio.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  link TEXT,
  description TEXT,
  video_url TEXT,
  github_url TEXT,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- SKILLS
DROP TABLE IF EXISTS xportfolio.skills CASCADE;
CREATE TABLE IF NOT EXISTS xportfolio.skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- COURSES
DROP TABLE IF EXISTS xportfolio.courses CASCADE;
CREATE TABLE IF NOT EXISTS xportfolio.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  link TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- TRIGGER FUNCTION
-- ====================================================================
CREATE OR REPLACE FUNCTION xportfolio.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profile_updated_at
  BEFORE UPDATE ON xportfolio.profile
  FOR EACH ROW
  EXECUTE FUNCTION xportfolio.update_updated_at();

CREATE TRIGGER update_education_updated_at
  BEFORE UPDATE ON xportfolio.education
  FOR EACH ROW
  EXECUTE FUNCTION xportfolio.update_updated_at();

CREATE TRIGGER update_work_experience_updated_at
  BEFORE UPDATE ON xportfolio.work_experience
  FOR EACH ROW
  EXECUTE FUNCTION xportfolio.update_updated_at();

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON xportfolio.projects
  FOR EACH ROW
  EXECUTE FUNCTION xportfolio.update_updated_at();

CREATE TRIGGER update_courses_updated_at
  BEFORE UPDATE ON xportfolio.courses
  FOR EACH ROW
  EXECUTE FUNCTION xportfolio.update_updated_at();

-- ====================================================================
-- Insert the single profile. Later we can update it. It's to handle profile because there is only one profile.
INSERT INTO xportfolio.profile (id, name, title)
VALUES ('00000000-0000-0000-0000-000000000001', 'Your Name', 'Your Title')
ON CONFLICT (id) DO NOTHING;

-- ====================================================================
-- TRIGGER TO PREVENT DELETION OF PROFILE
CREATE OR REPLACE FUNCTION xportfolio.prevent_profile_delete()
RETURNS TRIGGER AS $$
BEGIN
  RAISE EXCEPTION 'Deleting the profile is not allowed.';
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER block_profile_delete
  BEFORE DELETE ON xportfolio.profile
  FOR EACH ROW
  EXECUTE FUNCTION xportfolio.prevent_profile_delete();
  
-- ====================================================================
-- CONSTRAINT TO ENSURE ONLY ONE PROFILE EXISTS
ALTER TABLE xportfolio.profile
  ADD CONSTRAINT only_one_profile CHECK (id = '00000000-0000-0000-0000-000000000001');
