import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {
  }

  @Get()
  findAllBoards() {
    return this.boardsService.getBoards();
  }

  @Get(':boardId')
  findOneBoard(@Param() params) {
    return this.boardsService.getBoard(params.id);
  }

  @Post()
  createBoard(@Body() body) {
    return this.boardsService.postBoard(body);
  }

  @Put(':boardId')
  updateBoard(@Param() params, @Body() body) {
    return this.boardsService.putBoard(params.id, body);
  }

  @Delete(':boardId')
  deleteBoard(@Param() params) {
    this.boardsService.deleteBoard(params.id).then(() => {
      return 'Deleted success';
    });
  }
}
