import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {
  }

  @Get()
  findAllUsers() {
    return this.usersService.getUsers().then((data) => {
      data.forEach((item) => {
        delete item['password'];
      });
      return data;
    });
  }

  @Get(':userId')
  findOneUser(@Param() params) {
    return this.usersService.getUser(params.id).then((data) => {
      delete data['password'];
      return data;
    });
  }

  @Post()
  createUser(@Body() body) {
    return this.usersService.postUser(body).then((data) => {
      delete data['password'];
      return data;
    });
  }

  @Put(':userId')
  updateUser(@Param() params, @Body() body) {
    return this.usersService.putUser(params.id, body).then((data) => {
      delete data['password'];
      return data;
    });
  }

  @Delete(':userId')
  deleteUser(@Param() params) {
    this.usersService.deleteUser(params.id).then(() => {
      return 'Deleted success';
    });
  }
}
