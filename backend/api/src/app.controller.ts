import { Controller, Get } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';

@Controller()
export class AppController {
  @Get('status')
  getStatus() {
    return { status: 'OK', message: 'Backend Inovacion rodando!' };
  }
}

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'inovacion',
      password: 'senha123',
      database: 'inovaciondb',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]), // Adiciona a entidade aqui
  ],
})
export class AppModule {}