import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from '../entities/Task';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
  ) {}

  async getTasks() {
    return await this.taskRepository.find();
  }

  async getTask(id) {
    return await this.taskRepository.findOne(id);
  }

  async postTask(body) {
    const Task = this.taskRepository.create({
      ...body,
    });
    return await this.taskRepository.save(Task);
  }

  async putTask(id, body) {
    const Task = this.taskRepository.create({
      ...body,
      id,
    });
    return await this.taskRepository.save(Task);
  }

  async deleteTask(id) {
    const Task = await this.taskRepository.find(id);
    return await this.taskRepository.remove(Task);
  }
}
