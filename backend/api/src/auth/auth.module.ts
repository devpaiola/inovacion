import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UsersModule, JwtModule.register({})], // Se usar JWT
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService], // Exporte se precisar usá-lo em outros módulos
})
export class AuthModule {} // Isso garante que o módulo seja exportado corretamente
