export enum TaskStatus {
  Todo = 'todo',
  InProgress = 'inProgress',
  Done = 'done',
  Archived = 'archived',
}

export type Task = {
  id: number;
  title: string;
  status: string;
  updatedAt: string;
  createdat: string;
};