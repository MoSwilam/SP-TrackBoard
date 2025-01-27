# Project Tech Stack and Setup

## Frontend

- **Framework**: Vue.js
- **Language**: TypeScript
- **State Management**: Vue `ref` for reactive state
- **Drag-and-Drop**: Native HTML5 Drag-and-Drop API
- **Styling**: SCSS
- **Development Tools**: Vite

## Backend

- **Framework**: NestJS
- **Language**: TypeScript
- **ORM**: TypeORM
- **Database**: PostgreSQL (connected to a remote db for demo purposes)

## Monorepo Management

- **Tool**: Nx
  - **Dependency Graph**: Visualizes and manages dependencies between projects.
  - **Code Generation**: Automates boilerplate code for new components, services, or modules.
  - **Caching**: Speeds up builds and tests by caching results.
  - **Task Orchestration**: Runs tasks (e.g., build, test, lint) across multiple projects efficiently.

## Monorepo Structure

my-monorepo/
├── apps/
│ ├── frontend/ # Vue.js frontend application
│ │ ├── src/
│ │ │ ├── components/
│ │ │ ├── views/
│ │ │ ├── App.vue
│ │ │ └── main.ts
│ │ └── vite.config.ts
│ └── backend/ # NestJS backend application
│ ├── src/
│ │ ├── modules/
│ │ ├── entities/
│ │ ├── services/
│ │ ├── controllers/
│ │ └── main.ts
│ └── ormconfig.json # TypeORM configuration
├── nx.json # Nx configuration
├── package.json # Root package.json
├── eslint.config.cjs # Root Eslint configuration
├── .prettierrc # Root Prettier configuration
└── tsconfig.json # Root TypeScript configuration|

### Key Features of the Monorepo Setup

1. **Dependency Management**:
   - Nx ensures that dependencies between projects are managed efficiently.
2. **Build and Test Automation**:
   - Nx provides commands to build, test, and lint all projects in the monorepo.
   - Example commands:
     ```bash
     nx build frontend  # Build the frontend app
     nx test backend    # Run tests for the backend app
     ```
3. **Code Generation**:
   - Nx generators automate the creation of new components, services, modules, etc.
   - Example:
     ```bash
     nx generate @nx/vue:component my-component --project=frontend
     nx generate @nestjs/schematics:service my-service --project=backend
     ```
4. possiblilty to easily create and use a shared library between projects in the workspace


# Installation

1- clone the repository to your local machine:

```bash
git clone https://github.com/MoSwilam/SP-TrackBoard.git
```

2. Setup Environment Variables

Prepare the backend environment variables by copying the example file:

```bash
cp apps/backend/.env-example apps/backend/.env
```

Open the newly created .env file in apps/backend/ and set the DB_PASSWORD using the password provided in your email:

```bash
DB_PASSWORD=<PASSWORD-FROM-THE-EMAIL>
```

3. Install dependencies


```bash
npm i --legacy-peer-deps
```

## Running the Application

then finally:
```bash
make run
```

The frontend is set to run at `localhost:4200`

## Summary of Tech Stack

| Category                | Technology/Tool                            |
| ----------------------- | ------------------------------------------ |
| **Frontend**            | Vue.js (Composition API), TypeScript, Vite |
| **Backend**             | NestJS, TypeScript, TypeORM, PostgreSQL    |
| **Monorepo Management** | Nx                                         |
| **Database**            | PostgreSQL                                 |
| **API Communication**   | RESTful API, `apiClient`                   |

---

