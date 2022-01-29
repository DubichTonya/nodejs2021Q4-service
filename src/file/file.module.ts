import { Module } from '@nestjs/common';
import { FileController } from './file.controller';

@Module({
  providers: [],
  controllers: [FileController],
})
export class FileModule {}
