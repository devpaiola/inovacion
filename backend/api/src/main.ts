import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersService } from './users/users.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const userService = app.get(UsersService);

  // Cria um usuário administrador ao iniciar o aplicativo
  await userService.createAdminUser();

  await app.listen(3000);
}

bootstrap();
