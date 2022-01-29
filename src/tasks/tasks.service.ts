import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from '../entities/Task';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/User';
import { BoardEntity } from '../entities/Board';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(BoardEntity)
    private boardRepository: Repository<BoardEntity>,
  ) {}

  async getTasks() {
    return await this.taskRepository.find();
  }

  async getTask(id) {
    return await this.taskRepository.findOne(id);
  }

  async postTask(body, params) {
    const { userId } = body;
    const { boardId } = params;
    const board = boardId
      ? await this.boardRepository.findOne(boardId)
      : undefined;
    const user = userId ? await this.userRepository.findOne(userId) : undefined;
    const requestBody = userId
      ? {
          ...body,
          boardId,
          userId,
          board,
          user,
        }
      : {
          ...body,
          boardId,
          userId,
          board,
        };
    const task = this.taskRepository.create(requestBody);
    return await this.taskRepository.save(task);
  }

  async putTask(body, params) {
    const { userId } = body;
    const { boardId, taskId } = params;
    const board = boardId
      ? await this.boardRepository.findOne(boardId)
      : undefined;
    const user = userId ? await this.userRepository.findOne(userId) : undefined;
    const requestBody = userId
      ? {
          ...body,
          id: taskId,
          boardId,
          userId,
          board,
          user,
        }
      : {
          ...body,
          id: taskId,
          boardId,
          userId,
          board,
        };

    const Task = this.taskRepository.create(requestBody);
    return await this.taskRepository.save(Task);
  }

  async deleteTask(id) {
    const Task = await this.taskRepository.findOne(id);
    return await this.taskRepository.remove(Task);
  }
}
