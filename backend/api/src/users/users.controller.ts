// src/users/users.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  async create(
    @Body() body: { name: string; email: string; password: string },
  ) {
    return this.usersService.create(body.name, body.email, body.password);
  }

  @Post('create-admin')
  async createAdmin() {
    return this.usersService.createAdminUser(); // Agora esse método existe
  }
}
