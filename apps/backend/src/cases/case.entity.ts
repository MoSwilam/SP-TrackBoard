import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ValueTransformer
} from 'typeorm';
import { format } from 'date-fns';

const dateTransformer: ValueTransformer = {
  to(value: Date): Date {
    return value; // No transformation when saving to the database
  },
  from(value: Date): string {
    return format(value, 'MM-dd-yyyy HH:mm:ss'); // Format when reading from the database
  },
};

@Entity({ name: 'cases' })
export class Case {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ type: 'text', nullable: true })
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
