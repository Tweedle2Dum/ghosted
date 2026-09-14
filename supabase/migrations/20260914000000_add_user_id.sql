-- ============================================================================
-- Add user_id to Applications and Resume Versions
-- Migration: 20260914000000_add_user_id
-- ============================================================================

-- Alter resume_versions
ALTER TABLE resume_versions
  ADD COLUMN user_id TEXT NOT NULL,
  ADD CONSTRAINT fk_resume_versions_user
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

-- Alter applications
ALTER TABLE applications
  ADD COLUMN user_id TEXT NOT NULL,
  ADD CONSTRAINT fk_applications_user
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_resume_versions_user ON resume_versions(user_id);
CREATE INDEX IF NOT EXISTS idx_applications_user ON applications(user_id);
