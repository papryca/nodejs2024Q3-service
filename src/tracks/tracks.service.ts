import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { v4 as uuidv4 } from 'uuid';
import { Track } from './entities/track.entity';
@Injectable()
export class TracksService {
  private tracks = [];
  create(createTrackDto: CreateTrackDto) {
    const newTrack = { id: uuidv4(), ...createTrackDto };
    this.tracks.push(newTrack);
    return newTrack;
  }

  findAll() {
    return this.tracks;
  }

  findOne(id: string) {
    return this.tracks.find((track) => track.id === id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const trackIndex = this.tracks.findIndex((track) => track.id === id);
    if (trackIndex === -1) return null;
    this.tracks[trackIndex] = { ...this.tracks[trackIndex], ...updateTrackDto };
    return this.tracks[trackIndex];
  }

  remove(id: string) {
    const trackIndex = this.tracks.findIndex((track) => track.id === id);
    if (trackIndex === -1) return null;

    const deletedTrack = this.tracks.splice(trackIndex, 1);
    return deletedTrack[0];
  }
  findByIds(ids: string[]): Track[] {
    return this.tracks.filter((track) => ids.includes(track.id));
  }

  clearAlbum(albumId: string) {
    for (const track of this.tracks) {
      if (track.albumId === albumId) {
        track.albumId = null;
      }
    }
  }

  clearArtist(artistId: string) {
    for (const track of this.tracks) {
      if (track.artistId === artistId) {
        track.artistId = null;
      }
    }
  }
}
