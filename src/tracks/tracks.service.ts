import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { v4 as uuidv4 } from 'uuid';
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

  findOne(id: number) {
    return this.tracks.find((track) => track.id === id);
  }

  update(id: number, updateTrackDto: UpdateTrackDto) {
    const trackIndex = this.tracks.findIndex((track) => track.id === id);
    if (trackIndex === -1) return null;
    this.tracks[trackIndex] = { ...this.tracks[trackIndex], ...updateTrackDto };
    return this.tracks[trackIndex];
  }

  remove(id: number) {
    const trackIndex = this.tracks.findIndex((track) => track.id === id);
    if (trackIndex === -1) return null;

    const deletedTrack = this.tracks.splice(trackIndex, 1);
    return deletedTrack[0];
  }
}
