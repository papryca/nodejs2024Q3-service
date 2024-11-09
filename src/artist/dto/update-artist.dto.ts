import { PartialType } from '@nestjs/mapped-types';
import { CreateArtistDto } from './create-artist.dto';
import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateArtistDto extends PartialType(CreateArtistDto) {
  @IsUUID()
  @IsOptional()
  id: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsBoolean()
  @IsOptional()
  grammy: boolean;
}
