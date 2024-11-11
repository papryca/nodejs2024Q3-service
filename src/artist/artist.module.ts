import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { AlbumModule } from "../album/album.module";
import { TracksModule } from "../tracks/tracks.module";

@Module({
  imports: [AlbumModule, TracksModule],
  controllers: [ArtistController],
  providers: [ArtistService],
  exports: [ArtistService],
})
export class ArtistModule {}
