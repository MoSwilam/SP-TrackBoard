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
- **Database**: PostgreSQL

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
├── libs/
│ └── shared/ # Shared libraries (e.g., types, utilities)
│ ├── src/
│ │ ├── interfaces/
│ │ └── utils/
│ └── tsconfig.json
├── nx.json # Nx configuration
├── package.json # Root package.json
├── eslint.config.cjs # Root Eslint configuration
├── .prettierrc # Root Prettier configuration
└── tsconfig.json # Root TypeScript configuration|

### Key Features of the Monorepo Setup

1. **Shared Code**:
   - The `libs/shared` directory contains shared libraries (e.g., TypeScript interfaces, utility functions) that can be used by both the frontend and backend.
2. **Dependency Management**:
   - Nx ensures that dependencies between projects are managed efficiently.
3. **Build and Test Automation**:
   - Nx provides commands to build, test, and lint all projects in the monorepo.
   - Example commands:
     ```bash
     nx build frontend  # Build the frontend app
     nx test backend    # Run tests for the backend app
     nx lint shared     # Lint the shared library
     ```
4. **Code Generation**:
   - Nx generators automate the creation of new components, services, modules, etc.
   - Example:
     ```bash
     nx generate @nx/vue:component my-component --project=frontend
     nx generate @nestjs/schematics:service my-service --project=backend
     ```

## Database

- **PostgreSQL**:
  - A powerful, open-source relational database.
- **TypeORM**:

  - Used to define entities (e.g., `Task`, `User`) and interact with the database.
  - Example entity:

    ```typescript
    @Entity()
    export class Task {
      @PrimaryGeneratedColumn()
      id: number;

      @Column()
      title: string;

      @Column()
      status: string;

      @Column()
      updated: string;
    }
    ```

## API Communication

- **RESTful API**:

  - The NestJS backend exposes RESTful endpoints for the frontend to interact with.
  - Example endpoint:

    ```typescript
    @Controller('tasks')
    export class TasksController {
      constructor(private readonly tasksService: TasksService) {}

      @Get()
      findAll(): Promise<Task[]> {
        return this.tasksService.findAll();
      }

      @Patch(':id')
      updateStatus(
        @Param('id') id: string,
        @Body() updateTaskDto: UpdateTaskDto
      ) {
        return this.tasksService.updateStatus(+id, updateTaskDto.status);
      }
    }
    ```

- **API Client**:
  - The frontend uses an `apiClient` (likely based on `axios` or `fetch`) to communicate with the backend.

---

## Summary of Tech Stack

| Category                | Technology/Tool                            |
| ----------------------- | ------------------------------------------ |
| **Frontend**            | Vue.js (Composition API), TypeScript, Vite |
| **Backend**             | NestJS, TypeScript, TypeORM, PostgreSQL    |
| **Monorepo Management** | Nx                                         |
| **Database**            | PostgreSQL                                 |
| **API Communication**   | RESTful API, `apiClient`                   |

---

This `README.md` provides a comprehensive overview of your project's tech stack and setup. Let me know if you need further adjustments!
