import { Injectable, Logger } from '@nestjs/common';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';
import { TracksService } from '../tracks/tracks.service';

@Injectable()
export class FavoritesService {
  private favorites = {
    artists: [] as string[],
    albums: [] as string[],
    tracks: [] as string[],
  };
  constructor(
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly trackService: TracksService,
  ) {}
  addTrackToFavorites(trackId: string): boolean {
    const track = this.trackService.findOne(trackId);
    if (!track) {
      return false;
    }

    if (!this.favorites.tracks.includes(trackId)) {
      this.favorites.tracks.push(trackId);
      return true;
    }

    return false;
  }
  removeTrackFromFavorites(trackId: string) {
    const index = this.favorites.tracks.indexOf(trackId);
    if (index !== -1) {
      this.favorites.tracks.splice(index, 1);
      return true;
    }
    return false;
  }
  findAll() {
    const artists = this.artistService.findByIds(this.favorites.artists);
    const albums = this.albumService.findByIds(this.favorites.albums);
    const tracks = this.trackService.findByIds(this.favorites.tracks);
    return { artists, albums, tracks };
  }
  addAlbumToFavorites(albumId: string) {
    const album = this.albumService.findOne(albumId);
    if (!album) {
      return false;
    }

    if (!this.favorites.albums.includes(albumId)) {
      this.favorites.albums.push(albumId);
      return true;
    }
    return false;
  }

  removeAlbumFromFavorites(albumId: string) {
    const index = this.favorites.albums.indexOf(albumId);
    if (index !== -1) {
      this.favorites.albums.splice(index, 1);
      return true;
    }
    return false;
  }
  addArtistToFavorites(artistId: string) {
    const artist = this.artistService.findOne(artistId);
    if (!artist) {
      return false;
    }
    if (!this.favorites.artists.includes(artistId)) {
      this.favorites.artists.push(artistId);
      return true;
    }
    return false;
  }
  removeArtistFromFavorites(artistId: string) {
    const index = this.favorites.artists.indexOf(artistId);
    if (index !== -1) {
      this.favorites.artists.splice(index, 1);
      return true;
    }
    return false;
  }
  private isValidUuid(id: string): boolean {
    const uuidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return uuidRegex.test(id);
  }
}
