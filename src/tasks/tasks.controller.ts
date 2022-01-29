import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {
  }

  @Get()
  findAllTasks() {
    return this.tasksService.getTasks();
  }

  @Get(':taskId')
  findOneTask(@Param() params) {
    return this.tasksService.getTask(params.id);
  }

  @Post()
  createTask(@Body() body) {
    return this.tasksService.postTask(body);
  }

  @Put(':taskId')
  updateTask(@Param() params, @Body() body) {
    return this.tasksService.putTask(params.id, body);
  }

  @Delete(':taskId')
  deleteTask(@Param() params) {
    this.tasksService.deleteTask(params.id).then(() => {
      return 'Deleted success';
    });
  }
}
