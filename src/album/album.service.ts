import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { v4 as uuid } from 'uuid';
@Injectable()
export class AlbumService {
  private albums = [];

  create(createAlbumDto: CreateAlbumDto) {
    const newAlbum = {
      id: uuid(),
      ...createAlbumDto,
    };
    this.albums.push(newAlbum);
    return newAlbum;
  }

  findAll() {
    return this.albums;
  }

  findOne(id: string) {
    return this.albums.find((album) => album.id === id) || null;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const albumIndex = this.albums.findIndex((album) => album.id === id);
    if (albumIndex === -1) return null;

    this.albums[albumIndex] = {
      ...this.albums[albumIndex],
      ...updateAlbumDto,
    };
    return this.albums[albumIndex];
  }

  remove(id: string) {
    const albumIndex = this.albums.findIndex((album) => album.id === id);
    if (albumIndex === -1) return null;

    this.albums.splice(albumIndex, 1);
    return true;
  }

  findByIds(ids: string[]) {
    return this.albums.filter((album) => ids.includes(album.id));
  }

  clearArtist(artistId: string) {
    for (const album of this.albums) {
      if (album.artistId === artistId) {
        album.artistId = null;
      }
    }
  }
}
