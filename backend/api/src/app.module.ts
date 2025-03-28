import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';  // Certifique-se de que a entidade está correta
import { UsersService } from './users/users.service';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,  // Alterar para 5432
      username: 'inovacion',
      password: '181919',
      database: 'inovaciondb',
      entities: [User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'eraumavez123',  // Substitua por uma chave secreta segura
      signOptions: { expiresIn: '60s' },  // Defina a expiração do token, se necessário
    }),
  ],
  providers: [UsersService, AuthService],
  controllers: [AuthController],
})
export class AppModule {}
