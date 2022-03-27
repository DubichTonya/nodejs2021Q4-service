import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { BoardsModule } from './boards/boards.module';
import { TasksModule } from './tasks/tasks.module';
import { FileModule } from './file/file.module';
import config from '../ormconfig';
import { UserEntity } from './entities/User';
import { LoginModule } from './login/login.module';
import { UsersController } from './users/users.controller';
import { LoggerMiddleware } from './loggerMiddleware';
import { BoardsController } from './boards/boards.controller';
import { TasksController } from './tasks/tasks.controller';
import { FileController } from './file/file.controller';
import { LoginController } from './login/login.controller';

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
export class AppModule implements NestModule {
  constructor(private appService: AppService) {
    this.appService.addAdminProfile();
  }

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(
        UsersController,
        BoardsController,
        TasksController,
        FileController,
        LoginController,
      );
  }
}
