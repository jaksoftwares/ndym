-- ==========================================================
-- Diocese Table
-- ==========================================================
CREATE TABLE diocese (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ==========================================================
-- Archdeaconry Table
-- ==========================================================
CREATE TABLE archdeaconry (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    diocese_id INT NOT NULL REFERENCES diocese(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ==========================================================
-- Deanery Table
-- ==========================================================
CREATE TABLE deanery (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    archdeaconry_id INT NOT NULL REFERENCES archdeaconry(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ==========================================================
-- Parish Table
-- ==========================================================
CREATE TABLE parish (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    deanery_id INT NOT NULL REFERENCES deanery(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ==========================================================
-- Church Table
-- ==========================================================
CREATE TABLE church (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    parish_id INT NOT NULL REFERENCES parish(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ==========================================================
-- Youth Members Table
-- ==========================================================
CREATE TABLE youth_members (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    dob DATE NOT NULL,
    gender VARCHAR(20),
    phone VARCHAR(50),
    email VARCHAR(255),
    residence VARCHAR(255),
    
    status VARCHAR(50) NOT NULL, -- student / working / self-employed / other
    school VARCHAR(255),
    occupation VARCHAR(255),
    business_name VARCHAR(255),
    
    baptised BOOLEAN DEFAULT FALSE,
    confirmed BOOLEAN DEFAULT FALSE,
    saved BOOLEAN DEFAULT FALSE,
    
    role VARCHAR(50), -- member / leader
    position VARCHAR(100), -- if leader, e.g., choir leader
    
    photo_url TEXT,
    comments TEXT,
    
    church_id INT REFERENCES church(id) ON DELETE SET NULL,
    parish_id INT REFERENCES parish(id) ON DELETE SET NULL,
    deanery_id INT REFERENCES deanery(id) ON DELETE SET NULL,
    archdeaconry_id INT REFERENCES archdeaconry(id) ON DELETE SET NULL,
    diocese_id INT REFERENCES diocese(id) ON DELETE SET NULL,
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ==========================================================
-- Users / Admins Table
-- ==========================================================
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(50) NOT NULL, -- SUPER_ADMIN, DIOCESE_ADMIN, ARCHDEACONRY_ADMIN, DEANERY_ADMIN, PARISH_ADMIN, CHURCH_LEADER
    church_id INT REFERENCES church(id) ON DELETE SET NULL,
    parish_id INT REFERENCES parish(id) ON DELETE SET NULL,
    deanery_id INT REFERENCES deanery(id) ON DELETE SET NULL,
    archdeaconry_id INT REFERENCES archdeaconry(id) ON DELETE SET NULL,
    diocese_id INT REFERENCES diocese(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ==========================================================
-- Optional: Audit Log Table
-- ==========================================================
CREATE TABLE audit_logs (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    action VARCHAR(255),
    entity VARCHAR(50),
    entity_id INT,
    details JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

-- ==========================================================
-- Indexes for Faster Queries
-- ==========================================================
CREATE INDEX idx_youth_church ON youth_members(church_id);
CREATE INDEX idx_youth_parish ON youth_members(parish_id);
CREATE INDEX idx_youth_deanery ON youth_members(deanery_id);
CREATE INDEX idx_youth_archdeaconry ON youth_members(archdeaconry_id);
CREATE INDEX idx_youth_diocese ON youth_members(diocese_id);

CREATE INDEX idx_users_role ON users(role);