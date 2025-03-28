import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';



describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    jest.spyOn(bcrypt, 'hash').mockResolvedValue('$2b$10$fixedHashedPasswordExample123');
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
            remove: jest.fn(),
            create: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user successfully', async () => {
    const user = new User();
    user.name = 'Admin';
    user.email = 'admin@example.com';
    user.password = await bcrypt.hash('adminPassword123', 10);

    jest.spyOn(repository, 'save').mockResolvedValue(user);

    const result = await service.create(user.name, user.email, user.password);
    expect(result).toMatchObject({
  name: user.name,
  email: user.email,
});

    expect(repository.save).toHaveBeenCalled();
  });

  it('should update a user successfully', async () => {
    const user = new User();
    user.id = 1;
    user.name = 'Updated Name';
    user.email = 'updated@example.com';
    user.password = await bcrypt.hash('newpassword123', 10);

    jest.spyOn(repository, 'findOne').mockResolvedValue(user);
    jest.spyOn(repository, 'save').mockResolvedValue(user);

    const result = await service.update(user.id, user.name, user.email, user.password);
    expect(result).toMatchObject({
  name: user.name,
  email: user.email,
});
    expect(repository.save).toHaveBeenCalled();
  });

  it('should throw an error when user not found on update', async () => {
    const userId = 999;
    jest.spyOn(repository, 'findOne').mockResolvedValue(null);

    await expect(service.update(userId, 'any', 'any', 'any')).rejects.toThrow('User not found');
  });

  it('should delete a user successfully', async () => {
    const user = new User();
    user.id = 1;

    jest.spyOn(repository, 'findOne').mockResolvedValue(user);
    jest.spyOn(repository, 'remove').mockResolvedValue(user);

    await service.remove(user.id);
    expect(repository.remove).toHaveBeenCalledWith(user);
  });

  it('should throw an error when user not found on delete', async () => {
    const userId = 999;
    jest.spyOn(repository, 'findOne').mockResolvedValue(null);

    await expect(service.remove(userId)).rejects.toThrow('User not found');
  });

  // Teste para o createAdminUser
  it('should create an admin user successfully', async () => {
    const user = new User();
    user.name = 'Admin';
    user.email = 'admin@example.com';
    user.password = await bcrypt.hash('adminPassword123', 10);
    user.username = 'admin';

    jest.spyOn(repository, 'findOne').mockResolvedValue(null); // Simula que o admin não existe
    jest.spyOn(repository, 'save').mockResolvedValue(user);

    const result = await service.createAdminUser();
    expect(result).toMatchObject({
  name: user.name,
  email: user.email,
});
    expect(repository.save).toHaveBeenCalled();
  });

  it('should throw an error if admin user already exists', async () => {
    const existingUser = new User();
    existingUser.username = 'admin';
    
    jest.spyOn(repository, 'findOne').mockResolvedValue(existingUser);  // Simula que o admin já existe

    await expect(service.createAdminUser()).rejects.toThrow('O usuário admin já existe.');
  });
});
