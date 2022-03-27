import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/User';
import { Repository } from 'typeorm';
import { compareSync } from 'bcrypt';
import { JWT_SECRET_KEY } from '../common/config';
const jwt = require('jsonwebtoken');

interface IAuth {
  login: string;
  password: string;
}

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) {}
  async logIn(body) {
    const { login, password } = <IAuth>body;

    const user = await this.userRepo.findOne({ where: { login } });
    if (user && compareSync(password, user.password)) {
      const token = jwt.sign(
        {
          userId: user.id,
          login: user.login,
        },
        JWT_SECRET_KEY,
      );
      return { token: `${token}` };
    } else {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }
}
