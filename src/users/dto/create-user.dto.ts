import { IsInt, IsOptional, IsString, IsUUID, Min } from "class-validator";

export class CreateUserDto {
  @IsUUID()
  @IsOptional()
  id: string;

  @IsString()
  login: string;

  @IsString()
  password: string;

  @IsInt()
  @IsOptional()
  @Min(0)
  version: number;

  @IsInt()
  @IsOptional()
  @Min(0)
  createdAt: number;

  @IsInt()
  @IsOptional()
  @Min(0)
  updatedAt: number;
}
