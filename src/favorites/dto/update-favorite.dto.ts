import { PartialType } from '@nestjs/mapped-types';
import { CreateFavoriteDto } from './create-favorite.dto';
import { IsArray, IsOptional, IsUUID } from 'class-validator';

export class UpdateFavoriteDto extends PartialType(CreateFavoriteDto) {
  @IsArray()
  @IsUUID('4', { each: true })
  @IsOptional()
  artists: string[];

  @IsArray()
  @IsUUID('4', { each: true })
  @IsOptional()
  albums: string[];

  @IsArray()
  @IsUUID('4', { each: true })
  @IsOptional()
  tracks: string[];
}
