export enum TaskStatus {
  Todo = 'todo',
  InProgress = 'inProgress',
  Done = 'done',
  Archived = 'archived',
}

export type ICard = {
  id: number;
  title: string;
  status: string;
  updatedAt: string;
};