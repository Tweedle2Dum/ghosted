-- ============================================================================
-- Ghosted — Grant Schema & Table Permissions
-- Migration: 20260911000002_grant_table_permissions
-- ============================================================================

-- Grant schema usage
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;

-- Grant all permissions on all public tables to postgres and service_role
GRANT ALL ON ALL TABLES IN SCHEMA public TO postgres, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO postgres, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO postgres, service_role;

-- Ensure future tables automatically grant permissions
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO postgres, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON ROUTINES TO postgres, service_role;
