import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/User';
import { Repository } from 'typeorm';
import { hashSync } from 'bcrypt';
@Injectable()
export class AppService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) {}

  async addAdminProfile() {
    const admin = this.userRepo.findOne({ where: { login: 'admin' } });
    if (!admin) {
      const admin = this.userRepo.create({
        login: 'admin',
        password: hashSync('admin', 10),
      });

      await this.userRepo.save(admin);
      console.log('admin is ready');
    }
  }
}
