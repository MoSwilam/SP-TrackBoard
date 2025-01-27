import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ValueTransformer
} from 'typeorm';
import { format } from 'date-fns';

const dateTransformer: ValueTransformer = {
  to(value: Date): Date {
    return value;
  },
  from(value: Date): string {
    return format(value, 'MM-dd-yyyy HH:mm:ss'); 
  },
};

@Entity({ name: 'tasks' })
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title: string;

  @Column({ type: 'text', default: 'todo' })
  status!: string;

  @Column({ 
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP', 
    transformer: dateTransformer
  })
  createdAt!: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', transformer: dateTransformer })
  updatedAt!: Date;
}
