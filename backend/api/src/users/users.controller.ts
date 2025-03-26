import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() body: { name: string; email: string; password: string }): Promise<User> {
    return this.usersService.create(body.name, body.email, body.password);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<User | null> {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: { name: string; email: string; password: string }): Promise<User | null> {
    return this.usersService.update(id, body.name, body.email, body.password);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<boolean> {
    return this.usersService.remove(id);
  }
}
