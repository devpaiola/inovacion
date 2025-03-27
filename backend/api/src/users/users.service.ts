import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  remove(id: number) {
    throw new Error('Method not implemented.');
  }
  update(id: number, name: string, email: string, password: string) {
    throw new Error('Method not implemented.');
  }
  findOne(id: number) {
    throw new Error('Method not implemented.');
  }
  findAll() {
    throw new Error('Method not implemented.');
  }
  create(name: string, email: string, password: string) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(User) // Injeção correta do repositório
    private readonly userRepository: Repository<User>,
  ) {}

  async findOneByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { username } });
  }
}
