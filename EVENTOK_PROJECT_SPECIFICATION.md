# EVENTOK -- Master Project Specification (Starter)

> **Version:** 1.0\
> **Backend:** FastAPI\
> **Frontend (Web):** Next.js + React + TypeScript\
> **Android:** React Native (Expo)\
> **Database:** PostgreSQL\
> **UI Goal:** Minimalistic, Modern, Premium, Playful, UX First

------------------------------------------------------------------------

# 1. Project Overview

EventOK is an administrator-controlled event marketplace connecting
customers with verified vendors.

Unlike traditional marketplaces, customers **cannot directly contact
vendors** or view their personal details. Every enquiry, quotation,
booking, negotiation and payment is supervised by the administrator.

The platform consists of:

-   Responsive Website
-   Android Application
-   FastAPI Backend
-   Admin Dashboard

------------------------------------------------------------------------

# 2. User Roles

## Administrator

-   Approve / Reject vendors
-   Manage customers
-   Manage bookings
-   Manage payments
-   Manage commissions
-   Chat with customers
-   Assign vendors
-   View analytics

## Vendor

-   Register
-   Wait for approval
-   Login after approval
-   Upload portfolio
-   Manage services
-   Manage availability
-   View assigned bookings
-   Update booking progress

## Customer

-   Browse vendors
-   View portfolio
-   View reviews
-   Submit enquiry
-   Chat ONLY with admin
-   Pay through platform
-   Track booking

------------------------------------------------------------------------

# 3. Core Business Rules

1.  Customer can NEVER see vendor phone number.
2.  Customer can NEVER see vendor email.
3.  Customer can NEVER see vendor address.
4.  Customer can NEVER directly chat with vendor.
5.  Customer can NEVER see vendor pricing.
6.  Vendor receives access ONLY after admin approval.
7.  Admin controls every booking.
8.  Payments happen only through platform.

------------------------------------------------------------------------

# 4. Website Modules

## Public Website

-   Landing Page
-   About
-   Categories
-   Featured Vendors
-   Gallery
-   Testimonials
-   FAQ
-   Contact

## Customer Portal

-   Dashboard
-   Booking Requests
-   Chat
-   Payments
-   Notifications
-   Profile

## Vendor Portal

-   Dashboard
-   Portfolio
-   Services
-   Availability
-   Bookings
-   Earnings
-   Profile

## Admin Dashboard

-   Dashboard
-   Vendor Approval
-   Customers
-   Vendors
-   Categories
-   Booking Management
-   Payments
-   Reports
-   Analytics
-   Notifications
-   Settings

------------------------------------------------------------------------

# 5. Android App

Mirror the website functionality while keeping the UX mobile-first.

Bottom navigation: - Home - Explore - Chat - Bookings - Profile

Vendor App: - Dashboard - Portfolio - Services - Orders - Notifications

------------------------------------------------------------------------

# 6. Vendor Approval Workflow

1.  Vendor installs app or opens website.
2.  Registers account.
3.  Uploads KYC.
4.  Uploads GST (optional).
5.  Uploads portfolio.
6.  Account becomes Pending.
7.  Admin reviews.
8.  Approve or Reject.
9.  Vendor receives notification.
10. Dashboard unlocks after approval.

------------------------------------------------------------------------

# 7. Customer Journey

Home → Browse Vendors → Open Portfolio → Submit Booking Request → Chat
with Admin → Admin Shortlists Vendor → Payment → Booking Confirmed →
Event Completed → Review

------------------------------------------------------------------------

# 8. Vendor Portfolio

Each vendor can upload: - Images - Videos - Categories - Service Tags -
Experience - Description - City - Social media (optional, hidden from
customers if desired)

No pricing visible to customers.

------------------------------------------------------------------------

# 9. Chat

Customer ↔ Admin only

Vendor ↔ Admin only

Features: - Text - Images - PDF - Typing indicator - Read receipts -
Push notifications

------------------------------------------------------------------------

# 10. Payment

Suggested: - Razorpay

Features: - Advance Payment - Full Payment - Refund - Invoice - Payment
History - Vendor Settlement - Commission

------------------------------------------------------------------------

# 11. Notifications

-   Push
-   Email
-   SMS (future)

Events: - Vendor Approved - Booking Confirmed - Payment Success -
Booking Cancelled - New Chat Message

------------------------------------------------------------------------

# 12. UI Design Guidelines

Design Language: - Premium - Minimal - Playful - Modern - Large
whitespace - Rounded corners - Smooth animations

Typography: - Inter - Plus Jakarta Sans

Icons: - Lucide

Animations: - Framer Motion

------------------------------------------------------------------------

# 13. Backend

FastAPI Modules: - Authentication - Users - Vendors - Customers -
Bookings - Chats - Payments - Notifications - Reports

Database: - PostgreSQL

Caching: - Redis

Storage: - S3 / Cloudinary

Realtime: - WebSockets

------------------------------------------------------------------------

# 14. Suggested Database Tables

-   users
-   roles
-   vendors
-   customers
-   portfolios
-   portfolio_media
-   bookings
-   booking_requests
-   chats
-   messages
-   payments
-   invoices
-   notifications
-   categories
-   reviews
-   admin_logs

------------------------------------------------------------------------

# 15. API Guidelines

Each endpoint must include: - Authentication - Validation - Permission -
Success response - Error response

Example:

POST /api/vendors/register

POST /api/vendors/login

GET /api/vendors/profile

PUT /api/vendors/profile

POST /api/bookings

GET /api/bookings

POST /api/payments

GET /api/chat/messages

------------------------------------------------------------------------

# 16. UI Principles

Every screen must include: - Loading skeleton - Empty state - Error
state - Success toast - Responsive layout - Accessibility - Lazy loading

------------------------------------------------------------------------

# 17. Development Phases

Phase 1 - Authentication - Admin - Vendor Approval - Customer Portal

Phase 2 - Portfolio - Booking - Chat

Phase 3 - Payment - Reports - Notifications

Phase 4 - Android - Optimization - Testing

------------------------------------------------------------------------

# 18. AI Coding Rules (Claude/Cursor)

-   Use reusable components.
-   No inline CSS.
-   Tailwind only.
-   TypeScript only.
-   React Query.
-   React Hook Form.
-   Zod validation.
-   Clean Architecture.
-   SOLID principles.
-   Feature-first folder structure.
-   Business logic separated from UI.
-   Proper comments for complex logic.
-   Strict linting.
-   Unit tests where applicable.

------------------------------------------------------------------------

# 19. Future Scope

-   AI Vendor Recommendation
-   AI Chatbot
-   Calendar Integration
-   Multi-language
-   Coupons
-   Referral System
-   Vendor Subscription
-   CRM
-   Analytics Dashboard
-   iOS App

------------------------------------------------------------------------

> This document is intended as the master blueprint for EventOK. It
> should be expanded with screen-by-screen wireframes, API contracts,
> database schemas, and UI component specifications before production.
