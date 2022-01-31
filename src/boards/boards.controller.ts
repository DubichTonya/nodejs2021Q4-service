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
import { BoardsService } from './boards.service';
import { CustomValidationPipe } from "../pipes/validation.pipe";
import { boardPostSchema, boardPutSchema } from "../schemes/boards";

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
  @UsePipes(new CustomValidationPipe(boardPostSchema))
  createBoard(@Body() body) {
    return this.boardsService.postBoard(body);
  }

  @Put(':boardId')
  @UsePipes(new CustomValidationPipe(boardPutSchema))
  updateBoard(@Param() params, @Body() body) {
    return this.boardsService.putBoard(params.boardId, body);
  }

  @Delete(':boardId')
  async deleteBoard(@Param() params) {
    await this.boardsService.deleteBoard(params.boardId);
    return 'Deleted success';
  }
}
