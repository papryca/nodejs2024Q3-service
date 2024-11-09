import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  private artists = [];
  create(createArtistDto: CreateArtistDto) {
    const newArtist = { id: createArtistDto.id, ...createArtistDto };
    this.artists.push(newArtist);
    return newArtist;
  }

  findAll() {
    return this.artists;
  }

  findOne(id: number) {
    return this.artists.find((artist) => artist.id === id);
  }

  update(id: number, updateArtistDto: UpdateArtistDto) {
    const artistIndex = this.artists.findIndex((artist) => artist.id === id);
    if (artistIndex === -1) return null;
    this.artists[artistIndex] = {
      ...this.artists[artistIndex],
      ...updateArtistDto,
    };
    return this.artists[artistIndex];
  }

  remove(id: number) {
    const artistIndex = this.artists.findIndex((artist) => artist.id === id);
    if (artistIndex === -1) return null;
    const deletedArtist = this.artists.splice(artistIndex, 1);
    return deletedArtist[0];
  }
}
