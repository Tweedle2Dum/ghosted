-- ============================================================================
-- Ghosted — Job Application Tracker Schema
-- Migration: 20260911000000_create_tables
-- ============================================================================

-- Resume versions
CREATE TABLE IF NOT EXISTS resume_versions (
  id UUID DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  target_role_type TEXT,
  file_path TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),

  CONSTRAINT pk_resume_versions PRIMARY KEY (id)
);

-- Applications
CREATE TABLE IF NOT EXISTS applications (
  id UUID DEFAULT gen_random_uuid(),
  company TEXT NOT NULL,
  role_title TEXT NOT NULL,
  job_url TEXT,
  source TEXT,
  resume_version_id UUID,
  date_applied DATE DEFAULT CURRENT_DATE,
  current_status TEXT NOT NULL DEFAULT 'applied',
  priority INTEGER DEFAULT 0,
  salary_range TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),

  CONSTRAINT pk_applications PRIMARY KEY (id),
  CONSTRAINT fk_applications_resume
    FOREIGN KEY (resume_version_id) REFERENCES resume_versions(id) ON DELETE SET NULL,
  CONSTRAINT chk_applications_status
    CHECK (current_status IN (
      'applied','screening','interview','offer',
      'rejected','ghosted','withdrew'
    ))
);

-- Status events (source of truth for funnel analytics)
CREATE TABLE IF NOT EXISTS status_events (
  id UUID DEFAULT gen_random_uuid(),
  application_id UUID NOT NULL,
  from_status TEXT,
  to_status TEXT NOT NULL,
  event_date TIMESTAMPTZ DEFAULT now(),

  CONSTRAINT pk_status_events PRIMARY KEY (id),
  CONSTRAINT fk_status_events_application
    FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(current_status);
CREATE INDEX IF NOT EXISTS idx_applications_resume ON applications(resume_version_id);
CREATE INDEX IF NOT EXISTS idx_applications_date ON applications(date_applied);
CREATE INDEX IF NOT EXISTS idx_status_events_app ON status_events(application_id);
CREATE INDEX IF NOT EXISTS idx_status_events_flow ON status_events(from_status, to_status);
