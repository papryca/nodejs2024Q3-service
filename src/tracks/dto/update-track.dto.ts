import { PartialType } from '@nestjs/mapped-types';
import { CreateTrackDto } from './create-track.dto';
import { IsInt, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class UpdateTrackDto extends PartialType(CreateTrackDto) {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsUUID()
  @IsOptional()
  artistId?: string | null;

  @IsUUID()
  @IsOptional()
  albumId?: string | null;

  @IsInt()
  @Min(1)
  @IsOptional()
  duration?: number;
}
