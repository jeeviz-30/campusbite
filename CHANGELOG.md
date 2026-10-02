# Changelog

All notable changes to the **CampusBite - Canteen Pre-Order System** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-10-02

### Added
- **Authentication & User Management**:
  - Student and Canteen Staff role-based authentication (`/api/auth/register`, `/api/auth/login`).
  - Session-based user persistence and role redirection.
- **Dynamic Menu Catalog**:
  - Categorized item browsing (Meals & Biryani, Snacks, Beverages & Desserts).
  - Real-time dietary filters (Veg / Non-Veg) and search functionality.
  - Interactive cart management with quantity adjustment and dynamic total calculation.
- **Pre-Order Lifecycle**:
  - Atomic database transactions for placing multi-item orders (`/api/orders`).
  - Scheduled pickup time slots (Immediate, 15m, 30m, 45m, 1h).
  - Order history retrieval by user ID.
- **Admin & Staff Management Panel**:
  - Live stock availability toggling (`/api/menu/availability`).
  - Real-time order status updates (`PENDING` -> `PREPARING` -> `READY_FOR_PICKUP` -> `COMPLETED`).
- **Architecture & Infrastructure**:
  - Jakarta Servlet 6.0 REST API backend with Jackson Databind.
  - Dual-mode runtime: Standalone Java HTTP Server (`Server.java`) and Apache Tomcat 10+ WAR packaging.
  - MySQL 8.0+ transactional database schema with foreign key constraints.
  - Environment variable overrides (`DB_URL`, `DB_USER`, `DB_PASSWORD`, `PORT`).
  - Automated CI workflow with GitHub Actions (JDK 21, Maven).
  - JUnit 5 unit test suite for data models and serialization.
