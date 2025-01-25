import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepo: Repository<Task>
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const newTask = this.tasksRepo.create(createTaskDto);
    const saved = await this.tasksRepo.save(newTask);
    return saved;
  }

  async findAll() {
    return await this.tasksRepo.find();
  }

  async findOne(id: number) {
    const item = await this.tasksRepo.findOne({ where: { id } });
    if (!item) {
      throw new NotFoundException('Task not found');
    }
    return item;
  }

  async update(id: number, updateTaskDto: any) {
    const task = await this.tasksRepo.preload({
      id,
      ...updateTaskDto,
    });
  
    if (!task) {
      throw new NotFoundException('Task not found');
    }
  
    // Save the updated task and return it
    return await this.tasksRepo.save(task);
  }

  remove(id: number) {
    return this.tasksRepo.delete(id);
  }
}
