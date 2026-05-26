AI Prompt for Recreating the Finance Platform

# Context and Role
You are a Principal Full-Stack Engineer and Lead Software Architect specializing in high-throughput, enterprise-grade fintech applications. Your objective is to build a modern, AI-powered financial management and analytics SaaS platform.

The application must leverage a clean architectural boundary layer, production-grade security schemas, modular multi-zone folder management, and low-latency state processing. It must replicate the architecture, workflows, features, folder structure, and user experience of an advanced finance platform utilizing Next.js 15, React 19, Prisma ORM, PostgreSQL, Clerk authentication, automated event-driven pipelines, and highly interactive statistical dashboards.

# Objective
Develop a fully operational, high-performance finance management platform. The application must structurally enforce:

Secure Access Management: Layered authentication with automated route guards and multi-zone layout routing.
Account Architecture: Multi-type financial ledger accounts featuring balanced real-time mutations.
Transaction Pipelines: Full CRUD transaction tables utilizing optimistic UI state mutations.
Budget Watchdog Engine: Smart monitoring with dynamic threshold alerts and automatic overspending calculations.
Interactive Statistical Dashboards: Dynamic visualization using advanced charts, streaming summaries, and zero-state indicators.
AI Receipt Engine: Multi-format image capture parsing merchant data via deep vision processing models.
Event-Driven Workflow Automation: Background processing cron mechanics for recurring workflows.
Automated Notification Matrix: Threshold-triggered HTML messaging systems based on budget metrics.
Heuristic Financial Insights: Monthly pattern parsing and natural language spending recommendations generated using AI.
Modern Visual System: Fully accessible, fluid, motion-enhanced component design.
Hardened API Gateways: Optimized data layers incorporating advanced error normalization, request validation, and query performance tuning.
# Core Functional Requirements
1. Authentication & Layout Routing

Implement an enterprise identity management layout via Clerk:

Secure multi-factor registration and authentication loops.
Layout and Route Segment Management: Enforce structural code isolation using Next.js App Router sub-directories:
(auth): Non-authenticated public zone utilizing specialized isolated layouts (centered card matrices, no app chrome/sidebars) for sign-in and sign-up.
(main): Token-protected internal application loop utilizing global navigation layouts, telemetry views, responsive sidebars, and authenticated shell viewports.
Bouncer-style middleware interceptors providing atomic deep-link route protection.
Automatic backward-bounce redirection loops for users with an active session attempting to access login gates.
Encrypted, high-persistence session token management.
2. Analytical Dashboard System
Build a responsive metrics dashboard optimized for high readability:

Aggregated global balance matrices.
Comparative analytics displaying real-time Income vs. Expense metrics.
Windowed ledger summaries displaying recent transaction data blocks.
Multi-card budget utility track bars.
Performant visual rendering engines using Recharts for trend mapping.
Optimized view states utilizing skeleton UI blocks and graceful empty states.
3. Account Ledger System
Implement an isolated financial account management system:

Synchronous account instantiation across variable account profiles (Current, Savings, Credit Card, Investments, Cash).
Atomic account schema balance tracking with transactional history views.
Infinite scrolling or server-side paginated data grids for transaction records.
Performance indicators visualizing account allocation percentages over time.
4. Transaction Pipelines & Data Processing
Create a highly performant transaction manager incorporating standard data manipulation:

Parameterized forms handling Amount, Type, Account Linkage, Category, Date, Description, and Recurring Metadata.
Data Cleansing and Pre-Processing: Treat input pipelines with programmatic standard data filtering:
Null and Missing Value Treatment: Execute structural defaults and sanitization patterns on optional form payloads to prevent null pointer errors or unindexed fields.
Outlier Isolation and Guardrails: Flag and quarantine statistical data anomalies (e.g., erratic entry amounts outside normal deviation ranges) prior to database insertion.
UI performance updates using optimistic hooks to render changes before server verification finishes.
5. AI Receipt Scanner
Develop a natural-language computer vision pipeline leveraging the Google Gemini API:

Asynchronous multipart image ingestion gateways.
Advanced token extraction executing real-time string parsing of Merchant Name, Transaction Amount, Processing Date, and Categorization.
Data auto-hydration to pre-fill corresponding input form fields.
Failure mitigation protocols to handle unmappable images or unsupported file signatures gracefully.
6. Budget Watchdog System
Build a predictive budgeting matrix monitoring operational parameters:

Dynamic allocation engines calculating percentage spend vs. actual limits.
Real-time tracking loops checking expenditure changes against active budgets.
Automated Escalation Triggers: When spending breaches exactly 80% of defined monthly bounds:
Instantly fire a background tracking event log.
Trigger immediate warning signals within the user interface view.
Dispatch an automated background communication event notifying the user.
7. AI Heuristic Financial Insights
Generate customized telemetry and behavioral summaries via Google Gemini API:

Heuristic scanning engines to analyze transaction sequences for unusual spending behaviors.
Multi-factor summary generation offering practical, actionable advice on where to cut back.
Asynchronous caching loops saving generated insight blocks to dashboard visual layouts.
8. Background Jobs and Event Automation
Implement decoupled execution lifecycles using Inngest event architectures:

Cron-scheduled batch evaluation processors executing daily at midnight.
Automation workflows calculating balance increments and resetting structural counters.
Decoupled notification handlers pulling transaction tasks from queue states asynchronously.
9. Communications Engine
Establish automated user alerts using transactional mailing providers (Resend/Nodemailer):

Production of dynamic, responsive notifications using structured React Email templates.
Fault-tolerant queuing systems with automatic retry handling to manage transient delivery failures smoothly.
Cryptographic protection of all communication relays using server-managed environment variables.
# Technical Architecture & Data Normalization
Database Architecture & Prisma ORM

Deploy a relational PostgreSQL storage layer structured with explicit database indexing:

Highly relational database definitions explicitly mapping Users, Accounts, Transactions, Budgets, FinancialInsights, and Notifications.
Cascading deletion mechanics (onDelete: Cascade) enforced at database tier limits to ensure data integrity.
Strategic schema mapping using multi-column database indices (@@index, @@unique) across high-frequency lookup fields (userId, date, month).
Error Handling & Input Validation
Enforce strict validation boundaries to guarantee data sanitization and application stability:

Structural Input Validation: Every incoming payload, form submission, and server action must be validated at the application boundary using strong type checking via Zod schemas. Any malformed data must be rejected before triggering downstream business logic.
Unified Error Mapping and Normalization: Implement global catch blocks, specialized API error boundaries, and centralized middleware handlers. All errors must be normalized into standard API error codes, preventing raw stack traces from exposing database vulnerabilities to the frontend.
Security Shielding Protocols
Deploy multi-layer application hardening via ArcJet and native filters:

Real-time malicious bot shielding and automated scraping protection at edge layers.
Rate limiting using sliding token-bucket configurations to throttle high-frequency API endpoints.
Cross-Site Scripting (XSS) mitigation and strict input sanitization on all raw text blocks.
Performance Vectoring
Server-side data compilation utilizing optimized data pre-fetching and caching strategies.
Granular bundle-size reduction through dynamic component lazy loading and component code splitting.
Debounced inputs on high-frequency search boxes to prevent database query overloading.
# Folder Structure Requirements
Maintain a modular, domain-driven codebase layout:

Bash

├── actions          # Hardened Next.js Server Actions with atomic validation
├── app
│   ├── (auth)       # Isolated authentication segment routes and simple view layouts
│   ├── (main)       # Protected core dashboard, ledger, and transactional paths
│   └── api          # Unified public/private REST endpoints and Webhook matrices
├── components       # Feature-scoped and primitive reusable UI elements
├── emails           # Structured React Email programmatic component styles
├── inngest          # Asynchronous automation engine clients and background tasks
├── lib              # Shared utilities, security configurations, and validation schemas
├── prisma           # Structural schema configurations and tracking files
└── public           # Statically mapped system optimization files
# Setup and Environment Specification
Provide comprehensive onboarding documentation for local deployment setups:

Initialization guidelines for local PostgreSQL storage setups.
Schema synchronization commands via Prisma tracking pipelines.
Secret credential key management instructions across system services: Clerk Auth, Google Gemini AI, ArcJet Shielding, Resend Mailing, and local Inngest background event servers.
An exact mirror model file named .env.example must contain references to all required runtime variable declarations.

# Technology Stack
Frontend Core: Next.js 15 (App Router), React 19, Tailwind CSS, Shadcn UI, Framer Motion, Recharts.
Backend Matrix: Node.js, Next.js Server Actions, PostgreSQL, Prisma ORM.
Identity Management: Clerk.
Heuristic Processing AI: Google Gemini API.
Queue Automation: Inngest.
Communications Gateway: Resend / Nodemailer.
Security Middleware: ArcJet Shielding Engine, Zod Validation Pipeline.
# Final Deliverables
The project must deliver a complete, production-ready fintech ecosystem containing:

A high-performance analytics dashboard integrated with responsive visual charts.
A strict identity validation layer separating public forms from internal application views.
An AI-driven receipt scanner parsing transactions accurately via computer vision.
An integrated budget tracker with automated 80% spending alerts.
Decoupled background queue handlers managing recurring transaction schedules.
Robust schema boundaries with end-to-end data validation and standardized error processing.
Complete deployment configurations with a reproducible local initialization guide.
