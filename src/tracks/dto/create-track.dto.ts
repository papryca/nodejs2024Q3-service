import { IsInt, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class CreateTrackDto {
  @IsUUID()
  id: string;

  @IsString()
  name: string;

  @IsUUID()
  @IsOptional()
  artistId: string | null;

  @IsUUID()
  @IsOptional()
  albumId: string | null;

  @IsInt()
  @Min(1)
  duration: number;
}
