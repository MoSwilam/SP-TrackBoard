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

