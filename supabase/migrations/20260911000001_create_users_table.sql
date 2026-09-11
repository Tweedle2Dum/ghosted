-- ============================================================================
-- Ghosted — User Profile & Settings Schema
-- Migration: 20260911000001_create_users_table
-- ============================================================================

CREATE TABLE IF NOT EXISTS users (
  id TEXT NOT NULL,
  email TEXT NOT NULL,
  name TEXT,
  avatar TEXT,
  phone TEXT,
  preferences JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),

  CONSTRAINT pk_users PRIMARY KEY (id)
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
