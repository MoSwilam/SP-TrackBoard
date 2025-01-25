// libs/common/src/types/types.ts
export interface Task {
  id: number;
  title: string;
  status: string;
  updated: string;
}

export enum TaskStatus {
  Todo = 'todo',
  InProgress = 'inProgress',
  Done = 'done',
  Archived = 'archived',
}
