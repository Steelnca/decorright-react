-- Helper to generate Markdown documentation
-- Run this in Supabase SQL Editor.
-- The output will be rows of Markdown text. Copy all rows and paste them into DB_SCHEMA.md

-- 1. ENUMS
SELECT E'## Enums\n' as markdown_output
UNION ALL
SELECT 
  '- **' || t.typname || '**: ' || string_agg(e.enumlabel, ', ')
FROM pg_type t 
JOIN pg_enum e ON t.oid = e.enumtypid  
JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace
WHERE n.nspname = 'public'
GROUP BY t.typname

UNION ALL SELECT E'\n'

-- 2. TABLES & COLUMNS
UNION ALL SELECT E'## Tables\n'
UNION ALL
SELECT 
    E'### ' || table_name || E'\n\n' ||
    E'| Column | Type | Nullable |\n' ||
    E'| --- | --- | --- |\n' ||
    string_agg(E'| ' || column_name || E' | ' || data_type || E' | ' || is_nullable || E' |', E'\n') || E'\n'
FROM information_schema.columns
WHERE table_schema = 'public'
GROUP BY table_name

-- 3. RLS POLICIES
UNION ALL SELECT E'## RLS Policies\n'
UNION ALL
SELECT 
    E'### ' || tablename || E'\n' ||
    string_agg(E'- **' || policyname || E'**: ' || E'\n' ||
               E'  - Command: `' || cmd || E'`\n' ||
               E'  - Using: `' || COALESCE(qual::text, 'TRUE') || E'`\n' ||
               E'  - Check: `' || COALESCE(with_check::text, 'TRUE') || E'`', E'\n') || E'\n'
FROM pg_policies
WHERE schemaname = 'public'
GROUP BY tablename;
