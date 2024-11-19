import { Injectable, Logger } from '@nestjs/common';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';
import { TracksService } from '../tracks/tracks.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FavoritesService {
  private readonly logger = new Logger('test');
  constructor(private readonly prisma: PrismaService) {}
  async addTrackToFavorites(trackId: string) {
    const track = await this.prisma.track.findUnique({
      where: { id: trackId },
    });
    if (!track) {
      return false;
    }
    const existingFavorite = await this.prisma.favoriteTrack.findFirst({
      where: {
        trackId: trackId,
      },
    });

    if (existingFavorite) {
      return false;
    }

    await this.prisma.favoriteTrack.create({
      data: {
        trackId: trackId,
      },
    });

    return true;
  }
  async removeTrackFromFavorites(trackId: string) {
    const existingFavorite = await this.prisma.favoriteTrack.findFirst({
      where: { trackId },
    });
    if (!existingFavorite) {
      return false;
    }
    await this.prisma.favoriteTrack.delete({
      where: {
        trackId: trackId,
      },
    });
    return true;
  }

  async findAll() {
    const favAlbums = await this.prisma.favoriteAlbum.findMany({
      include: {
        album: true,
      },
    });

    const favArtists = await this.prisma.favoriteArtist.findMany({
      include: {
        artist: true,
      },
    });

    const favTracks = await this.prisma.favoriteTrack.findMany({
      include: {
        track: true,
      },
    });

    return {
      artists: favArtists.map((item) => item.artist),
      albums: favAlbums.map((item) => item.album),
      tracks: favTracks.map((item) => item.track),
    };
  }
  async addAlbumToFavorites(albumId: string) {
    const album = await this.prisma.album.findUnique({
      where: { id: albumId },
    });
    if (!album) {
      return false;
    }
    const existingFavorite = await this.prisma.favoriteAlbum.findFirst({
      where: {
        albumId: albumId,
      },
    });
    if (existingFavorite) {
      return false;
    }
    await this.prisma.favoriteAlbum.create({
      data: {
        albumId,
      },
    });
    return true;
  }

  async removeAlbumFromFavorites(albumId: string) {
    const existingFavorite = await this.prisma.favoriteAlbum.findFirst({
      where: {
        albumId: albumId,
      },
    });
    if (!existingFavorite) {
      return false;
    }
    await this.prisma.favoriteAlbum.delete({
      where: {
        albumId: albumId,
      },
    });
    return true;
  }
  async addArtistToFavorites(artistId: string) {
    const artist = await this.prisma.artist.findUnique({
      where: { id: artistId },
    });
    if (!artist) {
      return null;
    }
    const existingFavorite = await this.prisma.favoriteArtist.findFirst({
      where: {
        artistId: artistId,
      },
    });
    if (existingFavorite) {
      return null;
    }
    await this.prisma.favoriteArtist.create({
      data: {
        artistId: artistId,
      },
    });
    return artist;
  }
  async removeArtistFromFavorites(artistId: string) {
    const existingFavorite = await this.prisma.favoriteArtist.findFirst({
      where: { artistId },
    });
    if (!existingFavorite) {
      return false;
    }
    await this.prisma.favoriteArtist.delete({
      where: { artistId: artistId },
    });
    return true;
  }
}
