-- Nairobi Diocese Youth Ministry (NDYM) - Database Schema
-- Compatible with PostgreSQL and Supabase

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ==========================================
-- 1. ENUMS
-- ==========================================

-- Gender options
create type gender_type as enum ('MALE', 'FEMALE', 'OTHER');

-- Employment / Activity status
create type employment_status as enum ('STUDENT', 'WORKING', 'SELF_EMPLOYED', 'OTHER');

-- Admin Roles
create type admin_role as enum (
    'SUPER_ADMIN', 
    'DIOCESE_ADMIN', 
    'ARCHDEACONRY_ADMIN', 
    'DEANERY_ADMIN', 
    'PARISH_ADMIN', 
    'CHURCH_LEADER'
);

-- ==========================================
-- 2. CHURCH HIERARHCHY TABLES
-- ==========================================

-- Diocese (Top Level)
create table dioceses (
    id uuid primary key default uuid_generate_v4(),
    name text not null unique,
    description text,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

comment on table dioceses is 'The highest level of the church hierarchy (e.g., Nairobi Diocese).';

-- Archdeaconry (Child of Diocese)
create table archdeaconries (
    id uuid primary key default uuid_generate_v4(),
    diocese_id uuid not null references dioceses(id) on delete cascade,
    name text not null,
    description text,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    unique(diocese_id, name)
);

comment on table archdeaconries is 'A subdivision of a Diocese.';

-- Deanery (Child of Archdeaconry)
create table deaneries (
    id uuid primary key default uuid_generate_v4(),
    archdeaconry_id uuid not null references archdeaconries(id) on delete cascade,
    name text not null,
    description text,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    unique(archdeaconry_id, name)
);

comment on table deaneries is 'A subdivision of an Archdeaconry.';

-- Parish (Child of Deanery)
create table parishes (
    id uuid primary key default uuid_generate_v4(),
    deanery_id uuid not null references deaneries(id) on delete cascade,
    name text not null,
    description text,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    unique(deanery_id, name)
);

comment on table parishes is 'A subdivision of a Deanery.';

-- Church (Child of Parish)
create table churches (
    id uuid primary key default uuid_generate_v4(),
    parish_id uuid not null references parishes(id) on delete cascade,
    name text not null,
    address text,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    unique(parish_id, name)
);

comment on table churches is 'The local church level (e.g., St. Lukes). This is where youths are primarily registered.';

-- ==========================================
-- 3. YOUTHS TABLE
-- ==========================================

create table youths (
    id uuid primary key default uuid_generate_v4(),
    church_id uuid not null references churches(id) on delete restrict,
    
    -- Personal Info
    full_name text not null,
    date_of_birth date not null,
    gender gender_type not null,
    phone text,
    email text,
    residence text not null,
    
    -- Status Info
    status employment_status not null default 'OTHER',
    occupation_info text, -- Stores School Name, Occupation, or Business Name
    
    -- Spiritual Info
    is_baptized boolean default false,
    is_confirmed boolean default false,
    is_saved boolean default false,
    
    -- Ministry Role
    ministry_role text not null default 'Member', -- e.g., 'Member', 'Leader'
    leader_position text, -- e.g., 'Chairman', 'Secretary' (if ministry_role is Leader)
    
    -- Media & Feedback
    photo_url text, -- Cloudinary URL
    comments text,
    
    -- Timestamps
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

comment on table youths is 'Stores information for youths who register on the platform. No login required.';
comment on column youths.occupation_info is 'Flexible field for School Name, Occupation, or Business Name based on status.';

-- ==========================================
-- 4. ADMIN USERS (PROFILES)
-- ==========================================

-- This table extends the default Supabase auth.users table
create table profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    full_name text not null,
    email text not null unique,
    role admin_role not null,
    
    -- Hierarchy Assignment (Scoped access)
    diocese_id uuid references dioceses(id) on delete set null,
    archdeaconry_id uuid references archdeaconries(id) on delete set null,
    deanery_id uuid references deaneries(id) on delete set null,
    parish_id uuid references parishes(id) on delete set null,
    church_id uuid references churches(id) on delete set null,
    
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

comment on table profiles is 'Stores administrative users with role-based access. Linked to Supabase Auth.';

-- ==========================================
-- 5. AUDIT LOGS
-- ==========================================

create table audit_logs (
    id uuid primary key default uuid_generate_v4(),
    admin_id uuid references profiles(id) on delete set null,
    action text not null, -- e.g., 'CREATE', 'UPDATE', 'DELETE'
    target_table text not null, -- e.g., 'youths', 'churches'
    target_id uuid, -- ID of the record affected
    old_data jsonb,
    new_data jsonb,
    ip_address text,
    created_at timestamptz default now()
);

comment on table audit_logs is 'Tracks administrative actions for accountability.';

-- ==========================================
-- 6. INDEXES FOR FAST LOOKUPS
-- ==========================================

-- Hierarchy Lookups for Youths
create index idx_youths_church on youths(church_id);
create index idx_youths_full_name on youths(full_name);
create index idx_youths_gender on youths(gender);
create index idx_youths_status on youths(status);

-- Hierarchy Navigation
create index idx_archdeaconries_diocese on archdeaconries(diocese_id);
create index idx_deaneries_archdeaconry on deaneries(archdeaconry_id);
create index idx_parishes_deanery on parishes(deanery_id);
create index idx_churches_parish on churches(parish_id);

-- Admin Lookups
create index idx_profiles_role on profiles(role);
create index idx_profiles_church on profiles(church_id);
create index idx_profiles_parish on profiles(parish_id);

-- Audit Logs
create index idx_audit_logs_admin on audit_logs(admin_id);
create index idx_audit_logs_target on audit_logs(target_table, target_id);

-- ==========================================
-- 7. AUTOMATIC TIMESTAMPS (UPDATED_AT)
-- ==========================================

-- Function to update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

-- Apply triggers to all tables with updated_at
create trigger update_dioceses_updated_at before update on dioceses for each row execute function update_updated_at_column();
create trigger update_archdeaconries_updated_at before update on archdeaconries for each row execute function update_updated_at_column();
create trigger update_deaneries_updated_at before update on deaneries for each row execute function update_updated_at_column();
create trigger update_parishes_updated_at before update on parishes for each row execute function update_updated_at_column();
create trigger update_churches_updated_at before update on churches for each row execute function update_updated_at_column();
create trigger update_youths_updated_at before update on youths for each row execute function update_updated_at_column();
create trigger update_profiles_updated_at before update on profiles for each row execute function update_updated_at_column();

-- ==========================================
-- 8. HELPER VIEW (DENORMALIZED HIERARCHY)
-- ==========================================

-- This view makes it easy to fetch a youth with their full hierarchy
create or replace view youth_full_details as
select 
    y.*,
    c.name as church_name,
    p.name as parish_name,
    p.id as parish_id,
    d.name as deanery_name,
    d.id as deanery_id,
    a.name as archdeaconry_name,
    a.id as archdeaconry_id,
    dioc.name as diocese_name,
    dioc.id as diocese_id
from youths y
join churches c on y.church_id = c.id
join parishes p on c.parish_id = p.id
join deaneries d on p.deanery_id = d.id
join archdeaconries a on d.archdeaconry_id = a.id
join dioceses dioc on a.diocese_id = dioc.id;
