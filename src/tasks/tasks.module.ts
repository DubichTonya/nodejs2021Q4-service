import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from '../entities/Task';
import { UserEntity } from '../entities/User';
import { BoardEntity } from '../entities/Board';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity, UserEntity, BoardEntity])],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
