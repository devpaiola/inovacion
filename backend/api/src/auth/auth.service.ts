import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  // Validação de usuário e senha
  async validateUser(username: string, password: string): Promise<User | null> {
    const user: User | null = await this.usersService.findOneByUsername(username);
    if (user && user.password) {
      // Verificando a senha usando bcrypt
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        return user;  // Senha válida
      }
    }
    return null;  // Senha ou usuário inválido
  }

  // Função para login, utilizando JWT
  async login(username: string, password: string, loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.username, loginDto.password);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
