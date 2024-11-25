import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const now = new Date();
    const newUser = {
      id: uuidv4(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: now,
      updatedAt: now,
    };

    await this.prisma.user.create({
      data: newUser,
    });
    // const res = {
    //   createdAt: newUser.createdAt.getTime(),
    //   updatedAt: newUser.updatedAt.getTime(),
    //   ...newUser,
    // };
    // delete res.password;
    return this.prepareUser(newUser);
  }

  async findAll() {
    return (await this.prisma.user.findMany()).map(this.prepareUser);
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findFirst({
      where: { id },
    });

    if (user) {
      return this.prepareUser(user);
    }

    return null;
  }

  async remove(id: string) {
    return await this.prisma.user.delete({
      where: { id },
    });
  }
  async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const model = await this.prisma.user.findFirst({
      where: { id },
    });

    if (model && model.password === updatePasswordDto.oldPassword) {
      await this.prisma.user.update({
        where: { id },
        data: {
          password: updatePasswordDto.newPassword,
          version: model.version + 1,
          updatedAt: new Date(),
        },
      });
      return true;
    }

    return false;
  }

  prepareUser(obj: {
    id: string;
    login: string;
    password: string;
    version: number;
    createdAt: Date;
    updatedAt: Date;
  }) {
    return {
      id: obj.id,
      login: obj.login,
      version: obj.version,
      createdAt: obj.createdAt.getTime(),
      updatedAt: obj.updatedAt.getTime(),
    };
  }
}
