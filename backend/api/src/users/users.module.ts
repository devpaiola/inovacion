import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Certifique-se de que a entidade está registrada
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService], // Exporte o serviço caso outros módulos precisem dele
})
export class UsersModule {}
