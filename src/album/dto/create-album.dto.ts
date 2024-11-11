import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateAlbumDto {
  @IsUUID()
  @IsOptional()
  id: string;

  @IsString()
  name: string;

  @IsNumber()
  year: number;

  @IsUUID()
  @IsOptional()
  artistId: string | null;
}
