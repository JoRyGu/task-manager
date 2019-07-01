import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid/v1';
import { CreateTaskDto } from './dto/createTask.dto';
import { UpdateTaskDto } from './dto/updateTask.dto';
import { GetTasksFilterDto } from './dto/getTasksFilter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;

    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter(task => task.status === status);
    }

    if (search) {
      tasks = tasks.filter(task =>
        task.title.includes(search) ||
        task.description.includes(search));
    }

    return tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find(task => task.id === id);
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  updateTask(id: string, updateTaskDto: UpdateTaskDto): Task {
    const { title, description, status } = updateTaskDto;

    const i = this.tasks.findIndex(task => task.id === id);
    if (i !== -1) {
      if (title) { this.tasks[i].title = title; }
      if (description) { this.tasks[i].description = description; }
      if (status) { this.tasks[i].status = status; }
    }

    return this.tasks[i];
  }

  deleteTask(id: string): void {
    const updatedTasks = this.tasks.filter(task => task.id !== id);
    this.tasks = updatedTasks;
  }
}
