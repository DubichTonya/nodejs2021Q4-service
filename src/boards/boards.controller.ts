import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get()
  findAllBoards() {
    return this.boardsService.getBoards();
  }

  @Get(':boardId')
  findOneBoard(@Param() params) {
    return this.boardsService.getBoard(params.boardId).then((data) => {
      if (data) {
        return data;
      } else {
        throw new HttpException('Board not found', HttpStatus.NOT_FOUND);
      }
    });
  }

  @Post()
  createBoard(@Body() body) {
    return this.boardsService.postBoard(body);
  }

  @Put(':boardId')
  updateBoard(@Param() params, @Body() body) {
    return this.boardsService.putBoard(params.boardId, body);
  }

  @Delete(':boardId')
  async deleteBoard(@Param() params) {
    await this.boardsService.deleteBoard(params.boardId);
    return 'Deleted success';
  }
}
