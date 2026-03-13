🔹 Platform Description: Nairobi Diocese Youth Platform

Platform Name: Nairobi Diocese Youth Ministry Platform

Purpose:
This platform is designed to digitally manage and collect information about youths across the Nairobi Diocese. It enables church administrators to efficiently record, track, and manage youth data, while maintaining a structured hierarchy of the church’s organization. The platform provides a centralized, serverless, and scalable solution to manage youth registrations, church structures, and administrative users.

Target Users:

Youths: Provide their personal and spiritual information (no login required).

Church Administrators / Leaders: Manage the youth data, churches, parishes, deaneries, archdeaconries, and diocesan-level administration.

Key Features:

Youth Registration

Collects personal information: full name, date of birth, gender, residence, phone, and email.

Education/work information: Student (school), Working (occupation), Self-employed (business), Other.

Spiritual status: Baptized, Confirmed, Saved.

Role in youth ministry: Member or Leader (with position if leader).

Upload photo.

Add comments/feedback.

Form is fully responsive, branded according to the platform’s logo, and validates inputs for proper user experience.

Data is submitted directly to the backend without requiring user login.

Church Hierarchy Management

Supports the church’s hierarchical structure:

Church → Parish → Deanery → Archdeaconry → Diocese

Administrators can manage and assign youths to the appropriate church, parish, deanery, and archdeaconry.

Admin Panel

Role-based access:

Diocese Admin – full access.

Archdeaconry Admin – access limited to archdeaconry.

Deanery Admin – access limited to deanery.

Parish Admin / Church Leader – access limited to parish/church.

Admins can view, edit, and delete youth records.

Manage churches, parishes, deaneries, archdeaconries, and other admins.

Serverless Architecture

Frontend built with Next.js App Router (TypeScript).

Database powered by Supabase (PostgreSQL).

Images stored in Cloudinary.

Fully serverless API routes handle youth registration and image uploads.

Branding & UX

Colors and theme are derived from the platform logo.

Modern, accessible, and responsive design.

Smooth transitions, form validation, and mobile-first experience.

Additional Features

Audit logs to track actions by admins.

Search, filtering, and reporting of youth data by hierarchy.

Modular and extensible code structure for future enhancements.

🔹 Goal for the Schema Generation

Using this description, the goal is to create a fully functional database schema that includes:

Tables for youths, churches, parishes, deaneries, archdeaconries, diocese

Tables for admins/users with role-based permissions

Relationships enforcing the church hierarchy

Support for photo storage (Cloudinary URLs) and audit logs

Indexes for efficient queries

Fields for status, roles, spiritual info, and comments