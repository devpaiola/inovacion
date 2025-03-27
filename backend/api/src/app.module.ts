import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // ou 'mysql', 'sqlite', etc.
      host: 'localhost',
      port: 5432,
      username: 'inovacion',
      password: '181919',
      database: 'inovaciondb',
      entities: [User],
      synchronize: true, // Apenas para desenvolvimento! Em produção, use migrations.
    }),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
