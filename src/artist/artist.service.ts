import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ArtistService {
  private artists = [];
  create(createArtistDto: CreateArtistDto) {
    const newArtist = { id: uuid(), ...createArtistDto };
    this.artists.push(newArtist);
    return newArtist;
  }

  findAll() {
    return this.artists;
  }
  findByIds(ids: string[]): Artist[] {
    return this.artists.filter((artist) => ids.includes(artist.id));
  }
  findOne(id: string) {
    return this.artists.find((artist) => artist.id === id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artistIndex = this.artists.findIndex((artist) => artist.id === id);
    if (artistIndex === -1) return null;
    this.artists[artistIndex] = {
      ...this.artists[artistIndex],
      ...updateArtistDto,
    };
    return this.artists[artistIndex];
  }

  remove(id: string) {
    const artistIndex = this.artists.findIndex((artist) => artist.id === id);
    if (artistIndex === -1) return null;
    const deletedArtist = this.artists.splice(artistIndex, 1);
    return deletedArtist[0];
  }
}
