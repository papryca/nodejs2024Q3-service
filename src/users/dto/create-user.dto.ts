import { IsInt, IsString, IsUUID, Min } from 'class-validator';

export class CreateUserDto {
  @IsUUID()
  id: string;

  @IsString()
  login: string;

  @IsString()
  password: string;

  @IsInt()
  @Min(0)
  version: number;

  @IsInt()
  @Min(0)
  createdAt: number;

  @IsInt()
  @Min(0)
  updatedAt: number;
}
