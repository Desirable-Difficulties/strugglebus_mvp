# strugglebus_mvp: Visual Knowledge Graph Chat Platform

## Project Intent

This MVP is designed to be **cost-effective, template-driven, and scalable from the start**. As a newer software developer, my goal is to use Microsoft/Azure best practices and official templates with minimal customization, ensuring rapid delivery, maintainability, and low operational cost.

---

## Overview

This project is an Azure-native MVP platform that allows users to upload textual or tabular data (e.g., TXT, CSV), have it processed into a knowledge graph (KG) using GraphRAG, and interact with their KG visually and conversationally. Users see their knowledge graph rendered in an interactive UI and can chat with an LLM (Azure OpenAI) to query their specific KG.

The core goal: **Leverage standard Azure and open-source templates for all infrastructure and backend, minimize custom code, and keep the React-based frontend as the only major bespoke component.**

---

## Guiding Principles

- **Template-First:** Use Microsoft/Azure quickstarts and open-source templates for all infrastructure, backend, and data flow. Minimize customization to speed MVP delivery and ensure maintainability.
- **Cost-Effective:** Prioritize services with free/consumption tiers and monitor usage to avoid surprises.
- **Scalable & Modular:** Each feature (auth, upload, KG, chat, visualization) is a separate module/component, allowing future features (such as interactive quizzes and markdown/code pop-ups) to be added with minimal disruption.
- **Cloud Native:** Every component is built to scale horizontally, with consumption-based billing and no legacy infra.
- **Developer Experience:** Favor well-documented, widely used Microsoft/Azure packages and patterns to reduce onboarding time and errors.

---

## Core Functionality

- **Authentication:** Secure login via Azure AD B2C (supports scaling to multi-user, multi-KG use), using MSAL React library.
- **Data Upload:** Users upload files (initially TXT/CSV) via drag-and-drop. Large files and multiple uploads are supported.
- **KG Generation:** Uploaded data is processed by GraphRAG (containerized) to create a knowledge graph, saved in a user-specific storage location.
- **Visualize KG:** The knowledge graph is rendered with `react-force-graph` in the frontend, allowing for interactive exploration.
- **LLM Chat:** Users can chat with their KG through a simple UI, powered by Azure OpenAI and context/retrieval from Azure AI Search.
- **Data Isolation:** All user data is strictly partitioned and secured with Azure best practices (imagine privacy requirements akin to client banking data).
- **Future Ready:** The platform is designed for easy extension to multi-user, multi-KG, and multi-file-type scenarios, with scalable, modular Azure components.

---

## Tech Stack & Rationale

| Component       | Service/Tool                    | Why Chosen                                  |
|-----------------|--------------------------------|---------------------------------------------|
| UI Components   | Fluent UI (React)              | Microsoft official, accessible, modular     |
| Auth            | Azure AD B2C, MSAL React       | Scalable, secure, Azure-native, SSO-ready   |
| File Storage    | Azure Blob Storage, Azure SDK  | Handles large files, cheap, secure          |
| Metadata        | Cosmos DB/Table Storage        | For KG/job metadata (not KG files), fast query |
| Frontend        | Azure App Service (SSR)        | Hybrid/SSR ready, flexible, robust          |
| Backend API     | Azure Functions, Azure SDK     | Serverless, event-driven, scalable          |
| KG Processing   | Azure Container Apps           | Simple batch jobs, easy container deploy    |
| KG Search       | Azure AI Search                | Vector+keyword search, Azure-native RAG     |
| LLM Chat        | Azure OpenAI Service           | Best-in-class LLM, easy API                 |
| Monitoring      | Application Insights           | Telemetry, usage, performance, debugging    |
| Secrets/Logs    | Key Vault/Monitor              | Azure best practices                        |
| CI/CD           | GitHub Actions                 | Automated build, test, deploy pipelines     |
| Testing         | Jest, Playwright               | Unit and E2E testing                        |
| Linting         | eslint-config-fluent           | Code quality and consistency                |

**Why this stack?**
- All services are Azure-native, pay-for-what-you-use, and scale from MVP to production.
- Each pairs optimally with GraphRAG and other Azure components.
- Enables future enhancements (multi-user, new file types, advanced search, analytics) with minimal rework.
- Modular, template-driven approach ensures low technical debt and fast onboarding.

---

## High-Level Architecture

```
User (Browser)
   │
   ▼
Azure AD B2C (Auth) + MSAL React
   │
   ▼
Azure App Service (Frontend: React/Next.js + Fluent UI)
   │
   ▼─────────────────────────────┬─────────────────────────────────────────────
   │                             │
   ▼                             ▼
Azure Functions (API)     Azure Blob Storage (user folders)
   │                             ▲
   ▼                             │
Azure Container Apps (GraphRAG)  │
   │                             │
   ▼                             ▼
Azure AI Search (KG Index)       │
   │                             │
   ▼                             ▼
Azure OpenAI (LLM)         React-Force-Graph (Visualization)
   │
   ▼
Application Insights (Monitoring/Telemetry)
```

---

## Modular & Pluggable Project Structure

This project is structured so that each feature is a distinct, swappable module. New features (such as interactive quizzes or markdown/code pop-ups) can be added later as new modules/components, without disrupting the existing codebase.

```
strugglebus_mvp/
  frontend/         # React/Next.js app using Fluent UI, MSAL, react-markdown, etc.
  backend/          # Azure Functions API using Azure SDKs
  graph-rag-jobs/   # Containerized GraphRAG jobs
  infra/            # App-specific Bicep/ARM templates, deployment scripts
  docs/             # Documentation, diagrams, onboarding
  tests/            # Unit and E2E tests (Jest, Playwright)
```

---

## Order of Operations

A developer should follow this order to minimize rework and enable step-wise testing:

1. **Repo Setup**
    - Initialize repo with modular folders (`frontend/`, `backend/`, `graph-rag-jobs/`, `infra/`, `docs/`, `tests/`).
    - Use `main`, `dev`, and feature branches for development.
    - Use Pull Requests (PRs) for merging feature branches into `dev` and `main`.

2. **Authentication**
    - Configure Azure AD B2C tenant, apps, user flows.
    - Register frontend and backend applications in B2C, configure redirect URIs.
    - Integrate MSAL React for login/logout and token management.

3. **Blob Storage**
    - Create storage account and container.
    - Set up RBAC/SAS for user partitioning.
    - Use Azure Storage SDK for secure, modular access.

4. **Azure AI Search**
    - Set up Azure AI Search service from the beginning.
    - Configure an index for storing and querying KG node embeddings and metadata.
    - Integrate with backend for indexing and retrieval.

5. **Frontend Scaffold**
    - Scaffold React/Next.js app in `frontend/`, using Fluent UI for all UI components.
    - Integrate Azure AD B2C login/logout with MSAL.
    - Add drag-and-drop upload UI.

6. **Backend API Scaffold**
    - Create Azure Functions project in `backend/`.
    - Add endpoints (issue SAS, submit job, poll status, get KG, chat).
    - Secure endpoints by validating B2C JWT tokens in Azure Functions.

7. **File Upload Integration**
    - Wire frontend to backend for secure upload using SAS tokens.
    - Verify files are stored in user-specific Blob storage paths.

8. **GraphRAG Containerization**
    - Containerize GraphRAG in `graph-rag-jobs/` (provide a Dockerfile).
    - Ensure all secrets (Blob Storage connection, etc.) are passed via environment variables.
    - Deploy to Azure Container Apps.
    - Backend triggers jobs, monitors status, stores KG output in user folder, and indexes KG in Azure AI Search.

9. **Visualization**
    - Integrate `react-force-graph` to display KG JSON in frontend.
    - If the KG output format differs from what `react-force-graph` expects, implement a transformation step.

10. **LLM Chat**
    - Set up Azure OpenAI.
    - Backend retrieves KG context from Azure AI Search, queries LLM, returns answers.
    - Frontend provides chat UI.

11. **Metadata Management**
    - Use Cosmos DB/Table Storage for storing and querying KG/job metadata and user KG library (not the actual KG files).
    - Integrate this metadata for user KG library features and job status tracking.

12. **Monitoring, Cost Controls, and Testing**
    - Use Application Insights for telemetry and logs.
    - Monitor usage and costs with Azure Cost Management.
    - Add Jest and Playwright tests for frontend and backend.
    - Use eslint-config-fluent for linting and code quality.

---

## Core Packages/Services Used

| Area              | Package/Service             | Notes                                  |
|-------------------|----------------------------|----------------------------------------|
| UI                | Fluent UI                  | Official Microsoft React UI library    |
| Auth              | MSAL React, Azure AD B2C   | Secure, scalable authentication        |
| Storage           | @azure/storage-blob        | Blob file storage                      |
| Metadata          | @azure/cosmos or Table SDK | Fast metadata queries                  |
| Frontend          | React/Next.js, react-markdown | Modular, markdown/code ready        |
| API/Backend       | Azure Functions, Azure SDK | Serverless, modular APIs               |
| KG Processing     | Container Apps, Docker     | Scalable job orchestration             |
| Search            | Azure AI Search            | RAG, fast retrieval                    |
| LLM               | Azure OpenAI Service       | Chat, content generation               |
| Monitoring        | Application Insights       | Logs, usage, performance               |
| Secrets           | Azure Key Vault            | Secure secrets management              |
| CI/CD             | GitHub Actions             | Automated pipelines                    |
| Testing           | Jest, Playwright           | Unit/E2E testing                       |
| Linting           | eslint-config-fluent       | Microsoft code style                   |

---

## Developer Notes

- **Template-Driven:** Use Azure and OSS templates for every service. Only customize where absolutely necessary (mainly the frontend).
- **Branching:** Use `dev` for daily work, `main` for releases. Feature branches for major features. Use Pull Requests and code reviews.
- **Testing:** After each step, ensure a vertical slice (login, upload, visualize, chat) works end-to-end before expanding features.
- **Security:** All data is strictly partitioned per user; APIs are JWT-protected; use private endpoints where possible. Store all secrets in Key Vault.
- **Cost:** All services use free/consumption tiers where possible. Monitor Azure OpenAI and Azure AI Search usage (these may incur costs even at low usage). Use Azure Cost Management for tracking and alerts.
- **Modularity:** New features (interactive quizzes, markdown/code pop-ups, real-time collaboration, etc.) can be added as independent modules.

---

## Next Steps

- Clone this repo and follow the build order above.
- Refer to `/docs` for onboarding, deployment scripts, and architecture diagrams.
- For questions or issues, open a GitHub Discussion or Issue.

---

**This README is a living document. As the architecture evolves or new requirements emerge, update the overview and instructions to keep the team (and future contributors) aligned.**
