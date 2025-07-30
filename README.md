# strugglebus_mvp: Visual Knowledge Graph Chat Platform

## Overview

This project is an Azure-native MVP platform that allows users to upload textual or tabular data (e.g., TXT, CSV), have it processed into a knowledge graph (KG) using GraphRAG, and interact with their KG visually and conversationally. Users see their knowledge graph rendered in an interactive UI and can chat with an LLM (Azure OpenAI) to query their specific KG.

The core goal: **Leverage standard Azure and OSS templates for all infrastructure and backend, minimize custom code, and keep the React-based frontend as the only major bespoke component.**

---

## Core Functionality

- **Authentication:** Secure login via Azure AD B2C (supports scaling to multi-user, multi-KG use).
- **Data Upload:** Users upload files (initially TXT/CSV) via drag-and-drop. Large files and multiple uploads are supported.
- **KG Generation:** Uploaded data is processed by GraphRAG (containerized) to create a knowledge graph, saved in a user-specific storage location.
- **Visualize KG:** The knowledge graph is rendered with `react-force-graph` in the frontend, allowing for interactive exploration.
- **LLM Chat:** Users can chat with their KG through a simple UI, powered by Azure OpenAI and context/retrieval from Azure AI Search.
- **Data Isolation:** All user data is strictly partitioned and secured with Azure best practices (imagine privacy requirements akin to client banking data).
- **Future Ready:** The platform is designed for easy extension to multi-user, multi-KG, and multi-file-type scenarios, with scalable, modular Azure components.

---

## Project Philosophy

- **Template-First:** Use Azure and open-source templates wherever possible for infrastructure, backend, and data flow.
- **Minimal Customization:** Only the frontend (React/Next.js) will be a custom build; all other pieces use standard, updatable, and modular components.
- **Clear Separation of Concerns:** Each service (auth, storage, compute, API, search, LLM) is decoupled, making future updates, scaling, and maintenance straightforward.
- **Cloud Native:** Every component is built to scale horizontally, with consumption-based billing and no legacy infra.

---

## Tech Stack & Rationale

| Component       | Service/Tool              | Why Chosen                                  |
|-----------------|--------------------------|---------------------------------------------|
| Auth            | Azure AD B2C              | Scalable, secure, Azure-native, SSO-ready   |
| File Storage    | Azure Blob Storage        | Handles large files, cheap, secure          |
| Metadata        | Cosmos DB/Table Storage   | For KG/job metadata (not KG files), fast query |
| Frontend        | Azure App Service (SSR)   | Hybrid/SSR ready, flexible, robust          |
| Backend API     | Azure Functions           | Serverless, event-driven, scalable          |
| KG Processing   | Azure Container Apps      | Simple batch jobs, easy container deploy    |
| KG Search       | Azure AI Search           | Vector+keyword search, Azure-native RAG     |
| LLM Chat        | Azure OpenAI Service      | Best-in-class LLM, easy API                 |
| Secrets/Logs    | Key Vault/Monitor         | Azure best practices                        |

**Why this stack?**
- All services are Azure-native, pay-for-what-you-use, and scale from MVP to production.
- Each pairs optimally with GraphRAG and other Azure components.
- Enables future enhancements (multi-user, new file types, advanced search, analytics) with minimal rework.

---

## High-Level Architecture

```
User (Browser)
   │
   ▼
Azure AD B2C (Auth)
   │
   ▼
Azure App Service (Frontend: React/Next.js)
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
```

---

## Order of Operations

A developer should follow this order to minimize rework and enable step-wise testing:

1. **Repo Setup**
    - Create project folder and initialize repo (`frontend/`, `backend/`, `graph-rag-jobs/`, `infra/`, `docs/`).
    - Use `main`, `dev`, and feature branches for development.
    - Use Pull Requests (PRs) for merging feature branches into `dev` and `main`.

2. **Authentication**
    - Configure Azure AD B2C tenant, apps, user flows.
    - Register frontend and backend applications in B2C, configure redirect URIs.
    - Add a test user for initial validation.
    - Note: You will need a frontend to test login and token retrieval.

3. **Blob Storage**
    - Create storage account and container.
    - Set up RBAC/SAS for user partitioning.
    - Blob Storage is strictly for user-uploaded files and KG outputs (not metadata).

4. **Azure AI Search**
    - Set up Azure AI Search service from the beginning.
    - Configure an index for storing and querying KG node embeddings and metadata.
    - Integrate with backend for indexing and retrieval.
    - Note: AI Search will be used for all retrieval and chat context operations from the start.

5. **Frontend Scaffold**
    - Scaffold React/Next.js app in `frontend/`.
    - Integrate Azure AD B2C login/logout (`msal.js` or `next-auth`).
    - Configure redirect URIs to match Azure AD B2C app settings.
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

12. **Security, Monitoring, Cost Controls**
    - Use Key Vault for secrets, Monitor for logs, and Cost Management for budgeting.
    - Note: Azure OpenAI and Azure AI Search may incur costs even at low usage. Monitor usage and review pricing for all services.

---

## Summary Table: Build Steps & Dependencies

| Step | Component        | Depends On                    |
|------|------------------|-------------------------------|
| 1    | Repo/folder setup| None                          |
| 2    | Azure AD B2C     | None                          |
| 3    | Blob Storage     | None                          |
| 4    | Azure AI Search  | Blob Storage                  |
| 5    | Frontend scaffold| B2C setup                     |
| 6    | Backend scaffold | B2C setup, frontend (test)    |
| 7    | File upload      | Blob, backend, frontend       |
| 8    | GraphRAG compute | Upload pipeline, AI Search    |
| 9    | Visualization    | GraphRAG output               |
| 10   | LLM Chat         | KG exists, AI Search ready    |
| 11   | Metadata mgmt    | Pipeline works                |
| 12   | Security/monitor | Throughout                    |

---

## Project Folder Structure

```
graph-rag-mvp/
  frontend/         # React/Next.js app
  backend/          # Azure Functions API
  graph-rag-jobs/   # Containerized GraphRAG jobs
  infra/            # Bicep/ARM templates, deployment scripts
  docs/             # Documentation, diagrams, onboarding
```

---

## Developer Notes

- **Template-Driven:** Use Azure QuickStarts and OSS templates for each service. Only customize where absolutely necessary (mainly the frontend).
- **Branching:** Use `dev` for daily work, `main` for releases. Feature branches for major features. Use Pull Requests and code reviews when merging.
- **Testing:** After each step, ensure a vertical slice (login, upload, visualize, chat) works end-to-end before expanding features.
- **Security:** All data is strictly partitioned per user; APIs are JWT-protected; use private endpoints where possible.
- **Cost:** All services have a free/consumption tier, but Azure OpenAI and Azure AI Search may incur charges even at low usage. Monitor resource usage and review Azure pricing.

---

## Next Steps

- Clone this repo and follow the build order above.
- Refer to `/docs` for onboarding, deployment scripts, and architecture diagrams.
- For questions or issues, open a GitHub Discussion or Issue.

---

**This README is a living document. As the architecture evolves or new requirements emerge, update the overview and instructions to keep the team (and future contributors) aligned.**
