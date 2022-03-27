import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardEntity } from '../entities/Board';
import { Repository } from 'typeorm';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardEntity)
    private boardRepository: Repository<BoardEntity>,
  ) {}

  async getBoards() {
    return await this.boardRepository.find();
  }

  async getBoard(id) {
    return await this.boardRepository.findOne(id);
  }

  async postBoard(body) {
    const Board = this.boardRepository.create({
      ...body,
    });
    return await this.boardRepository.save(Board);
  }

  async putBoard(id, body) {
    const Board = this.boardRepository.create({
      ...body,
      id,
    });
    return await this.boardRepository.save(Board);
  }

  async deleteBoard(id) {
    const Board = await this.boardRepository.findOne(id);
    return await this.boardRepository.remove(Board);
  }
}
