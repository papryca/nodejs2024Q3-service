import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsInt, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsUUID()
  id: string;

  @IsString()
  @IsOptional()
  login?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  version?: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  createdAt?: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  updatedAt?: number;
}
export class UpdatePasswordDto {
  @IsString()
  oldPassword: string;

  @IsString()
  newPassword: string;
}
