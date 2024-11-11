import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto, UpdateUserDto } from './dto/update-user.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  private users = [];
  create(createUserDto: CreateUserDto) {
    const now = Date.now();
    const newUser = {
      id: uuidv4(),
      version: 1,
      createdAt: now,
      updatedAt: now,
      ...createUserDto,
    };
    this.users.push(newUser);
    const res = { ...newUser };
    delete res.password;
    return res;
  }

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    return this.users.find((user) => user.id === id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) return null;
    this.users[userIndex] = { ...this.users[userIndex], ...updateUserDto };
    return this.users[userIndex];
  }

  remove(id: string) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) return null;
    const deletedUser = this.users.splice(userIndex, 1);
    return deletedUser[0];
  }
  updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = this.findOne(id);
    if (user && user.password === updatePasswordDto.oldPassword) {
      user.password = updatePasswordDto.newPassword;
      user.version = user.version + 1;
      user.updatedAt = Date.now();
      return true;
    }
    return false;
  }
}
