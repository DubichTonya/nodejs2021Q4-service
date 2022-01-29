import {
  Controller,
  Get,
  Param,
  Post,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import e from 'express';
import { createReadStream } from 'fs';
import * as path from 'path';

@Controller('file')
export class FileController {
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
        filename(
          req: e.Request,
          file: Express.Multer.File,
          callback: (error: Error | null, filename: string) => void,
        ) {
          const filename: string = file.originalname;
          callback(null, `${filename}`);
        },
      }),
    }),
  )
  upload(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
    }
    return `File uploaded: ${file.filename}`;
  }

  @Get(':fileName')
  getFile(@Param() param): StreamableFile {
    const file = createReadStream(
      path.join(process.cwd(), `files/${param.fileName}`),
    );
    return new StreamableFile(file);
  }
}
