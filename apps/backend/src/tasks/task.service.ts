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
    console.log('createTaskDto', createTaskDto);
    const newTask = this.tasksRepo.create(createTaskDto);
    return await this.tasksRepo.save(newTask);
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

  async update(id: number, updateTaskDto: Partial<CreateTaskDto>) {
    console.log('updateTaskDto', updateTaskDto);
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

  async remove(id: number) {
    console.log('delete task with Id', id);
    return await this.tasksRepo.delete(id);
  }
}
