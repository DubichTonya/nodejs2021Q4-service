import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put, UsePipes
} from "@nestjs/common";
import { TasksService } from './tasks.service';
import { CustomValidationPipe } from "../pipes/validation.pipe";
import { taskPostSchema, taskPutSchema } from "../schemes/tasks";

@Controller('boards/:boardId/tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  findAllTasks() {
    return this.tasksService.getTasks().then((data) => {
      if (data) {
        data.forEach((item) => {
          delete item['board'];
          delete item['user'];
        });
        return data;
      } else {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
    });
  }

  @Get(':taskId')
  findOneTask(@Param() params) {
    return this.tasksService.getTask(params.taskId).then((data) => {
      if (data) {
        delete data['board'];
        delete data['user'];
        return data;
      } else {
        throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
      }
    });
  }

  @Post()
  @UsePipes(new CustomValidationPipe(taskPostSchema))
  createTask(@Body() body, @Param() params) {
    return this.tasksService.postTask(body, params).then((data) => {
      delete data['board'];
      delete data['user'];
      return data;
    });
  }

  @Put(':taskId')
  @UsePipes(new CustomValidationPipe(taskPutSchema))
  updateTask(@Body() body, @Param() params) {
    return this.tasksService.putTask(body, params).then((data) => {
      delete data['board'];
      delete data['user'];
      return data;
    });
  }

  @Delete(':taskId')
  async deleteTask(@Param() params) {
    await this.tasksService.deleteTask(params.taskId);
    return 'Deleted success';
  }
}
