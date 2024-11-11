import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateArtistDto {
  @IsUUID()
  @IsOptional()
  id: string;

  @IsString()
  name: string;

  @IsBoolean()
  grammy: boolean;
}
