import { Module } from '@nestjs/common';
import { TasksService } from './task.service';
import { TasksController } from './task.controller';
import { AppConfigModule } from '../config/app-config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionsFilter } from '../filters/http.exception.filter';

@Module({
  imports: [AppConfigModule, TypeOrmModule.forFeature([Task])],
  controllers: [TasksController],
  providers: [
    
    {
      provide: APP_FILTER,
      useClass: HttpExceptionsFilter
    },
    TasksService,
  ],
})
export class TasksModule {}
