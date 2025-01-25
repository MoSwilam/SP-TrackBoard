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
    await this.findOne(id);
    return await this.tasksRepo.update(id, updateTaskDto);
  }

  remove(id: number) {
    return this.tasksRepo.delete(id);
  }
}
