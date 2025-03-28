import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async findOneByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async update(id: number, name: string, email: string, password: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }
    user.name = name;
    user.email = email;
    user.password = await bcrypt.hash(password, 10); // Hash da senha para manter a segurança
    return this.usersRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }
    await this.usersRepository.remove(user);
  }

  async create(name: string, email: string, password: string): Promise<User> {
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = await bcrypt.hash(password, 10);
    return this.usersRepository.save(user);
  }

  async createAdminUser(): Promise<User> {
    const existingUser = await this.usersRepository.findOne({ where: { username: 'admin' } });

    if (existingUser) {
      throw new Error('O usuário admin já existe.');
    }

    const hashedPassword = await bcrypt.hash('adminPassword123', 10); // Defina uma senha forte
    const user = this.usersRepository.create({
      name: 'Admin',
      email: 'admin@example.com',
      password: hashedPassword,
      username: 'admin',
    });
    return this.usersRepository.save(user);
  }
}
