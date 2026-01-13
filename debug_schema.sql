-- Run this query in Supabase SQL Editor to see your current schema tables, columns, and policies.

SELECT 
    t.table_name,
    c.column_name,
    c.data_type,
    c.is_nullable
FROM 
    information_schema.tables t
JOIN 
    information_schema.columns c ON t.table_name = c.table_name
WHERE 
    t.table_schema = 'public'
ORDER BY 
    t.table_name, c.ordinal_position;

-- To see policies:
SELECT * FROM pg_policies WHERE schemaname = 'public';
