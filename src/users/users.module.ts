import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/User';
import { TaskEntity } from '../entities/Task';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, TaskEntity])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
