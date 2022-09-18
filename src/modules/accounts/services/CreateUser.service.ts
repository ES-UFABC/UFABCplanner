import { hash } from 'bcryptjs';
import { singleton } from 'tsyringe';
import { AppError } from 'infra/http/errors/AppError';
import { CreateUserDTO } from '../dtos/CreateUser.dto';
import { PrismaUserRepository } from '../repositories/prisma/PrismaUserRepository';

@singleton()
export class CreateUserService {
  constructor(private usersRepository: PrismaUserRepository) {}

  async execute({ email, name, password }: CreateUserDTO): Promise<void> {
    const userExists = await this.usersRepository.exists(email);

    if (userExists) {
      throw new AppError('E-mail já utilizado, usuário já existente!');
    }

    const passwordHash = await hash(password, 8);

    await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
    });
  }
}
