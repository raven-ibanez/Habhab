-- Enable the pg_cron extension if it's not already enabled
create extension if not exists pg_cron;

-- Schedule a daily health check job to keep the database active
-- This runs at 8:00 AM every day
-- It performs a simple select on categories to ensure activity
select
  cron.schedule(
    'daily-db-health-check',
    '0 8 * * *',
    'SELECT 1 FROM categories LIMIT 1'
  );

-- Grant necessary permissions (optional but good practice)
-- Note: cron jobs run as the service_role/postgres user by default in Supabase
