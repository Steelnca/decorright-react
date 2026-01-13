-- migration_sync.sql
-- Run this in your Supabase SQL Editor to sync the service_requests table

-- 1. Create missing enums
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'request_status') THEN
        CREATE TYPE public.request_status AS ENUM ('Submitted', 'Under Review', 'Waiting for Client Info', 'Approved', 'In Progress', 'Completed', 'Rejected', 'Cancelled');
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'service_type') THEN
        CREATE TYPE public.service_type AS ENUM ('INTERIOR_DESIGN', 'FIXED_DESIGN', 'DECOR_CONSULTATION', 'BUILDING_RENOVATION', 'FURNITURE_REQUEST');
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'space_type') THEN
        CREATE TYPE public.space_type AS ENUM ('HOUSES_AND_ROOMS', 'COMMERCIAL_SHOPS', 'SCHOOLS_AND_NURSERIES', 'OFFICES_RECEPTION', 'DORMITORY_LODGINGS');
    END IF;
END $$;

-- 2. Add missing columns to service_requests
ALTER TABLE public.service_requests 
ADD COLUMN IF NOT EXISTS request_code TEXT,
ADD COLUMN IF NOT EXISTS location TEXT,
ADD COLUMN IF NOT EXISTS area_sqm DECIMAL,
ADD COLUMN IF NOT EXISTS space_type public.space_type;

-- 3. Ensure columns have the correct types (casting if necessary)
-- This might fail if there's incompatible data, but in a fresh project it should be fine.
DO $$ BEGIN
    ALTER TABLE public.service_requests 
    ALTER COLUMN service_type TYPE public.service_type USING service_type::public.service_type;
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Could not convert service_type to enum. It might already be an enum or have incompatible values.';
END $$;

-- 4. Add unique constraint to request_code if not exists
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'service_requests_request_code_key') THEN
        ALTER TABLE public.service_requests 
        ADD CONSTRAINT service_requests_request_code_key UNIQUE (request_code);
    END IF;
END $$;

-- 6. Drop legacy check constraints if they exist
ALTER TABLE public.service_requests 
DROP CONSTRAINT IF EXISTS service_requests_service_type_check;

-- 8. Enable RLS and add core policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Helper function to check admin status without triggering RLS recursively
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Profiles Policies
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT USING (public.is_admin());

-- Service Requests Policies
DROP POLICY IF EXISTS "Users can view their own requests" ON public.service_requests;
CREATE POLICY "Users can view their own requests" ON public.service_requests FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own requests" ON public.service_requests;
CREATE POLICY "Users can insert their own requests" ON public.service_requests FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can view all requests" ON public.service_requests;
CREATE POLICY "Admins can view all requests" ON public.service_requests FOR ALL USING (public.is_admin());

-- Chat Rooms Policies
DROP POLICY IF EXISTS "Users can view chat rooms of their requests" ON public.chat_rooms;
CREATE POLICY "Users can view chat rooms of their requests" ON public.chat_rooms 
FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.service_requests WHERE id = chat_rooms.request_id AND user_id = auth.uid()) 
    OR public.is_admin()
);

DROP POLICY IF EXISTS "Users can create chat rooms for their requests" ON public.chat_rooms;
CREATE POLICY "Users can create chat rooms for their requests" ON public.chat_rooms 
FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.service_requests WHERE id = request_id AND user_id = auth.uid())
);

DROP POLICY IF EXISTS "Admins can view all chat rooms" ON public.chat_rooms;
CREATE POLICY "Admins can view all chat rooms" ON public.chat_rooms 
FOR ALL USING (public.is_admin());

-- Messages Policies
DROP POLICY IF EXISTS "Users can view messages in their rooms" ON public.messages;
CREATE POLICY "Users can view messages in their rooms" ON public.messages 
FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM public.chat_rooms 
        JOIN public.service_requests ON public.service_requests.id = public.chat_rooms.request_id 
        WHERE public.chat_rooms.id = messages.chat_room_id AND public.service_requests.user_id = auth.uid()
    )
    OR public.is_admin()
);

DROP POLICY IF EXISTS "Users can insert messages in their rooms" ON public.messages;
CREATE POLICY "Users can insert messages in their rooms" ON public.messages 
FOR INSERT WITH CHECK (
    auth.uid() = sender_id AND (
        EXISTS (
            SELECT 1 FROM public.chat_rooms 
            JOIN public.service_requests ON public.service_requests.id = public.chat_rooms.request_id 
            WHERE public.chat_rooms.id = chat_room_id AND public.service_requests.user_id = auth.uid()
        )
        OR public.is_admin()
    )
);

DROP POLICY IF EXISTS "Admins can manage all messages" ON public.messages;
CREATE POLICY "Admins can manage all messages" ON public.messages 
FOR ALL USING (public.is_admin());

-- 9. Reload PostgREST schema cache
NOTIFY pgrst, 'reload schema';
