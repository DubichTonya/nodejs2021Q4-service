import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { BoardsModule } from './boards/boards.module';
import { TasksModule } from './tasks/tasks.module';
import { FileModule } from './file/file.module';
import config from '../ormconfig';
import { UserEntity } from "./entities/User";
import { LoginModule } from './login/login.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    TypeOrmModule.forFeature([UserEntity]),
    UsersModule,
    BoardsModule,
    TasksModule,
    FileModule,
    LoginModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private appService: AppService) {
    this.appService.addAdminProfile();
  }
}
