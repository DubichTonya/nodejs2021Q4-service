import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/User';
import { Repository } from 'typeorm';
import { hashSync } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async getUsers() {
    return await this.userRepository.find();
  }

  async getUser(id) {
    return await this.userRepository.findOne(id);
  }

  async postUser(body) {
    const user = this.userRepository.create({
      ...body,
      password: hashSync(body.password, 10),
    });
    return await this.userRepository.save(user);
  }

  async putUser(id, body) {
    const requestBody = body.password
      ? {
          id,
          ...body,
          password: hashSync(body.password, 10),
        }
      : {
          id,
          ...body,
        };
    const user = this.userRepository.create(requestBody);
    return await this.userRepository.save(user);
  }

  async deleteUser(id) {
    const user = await this.userRepository.find(id);
    return await this.userRepository.remove(user);
  }
}
