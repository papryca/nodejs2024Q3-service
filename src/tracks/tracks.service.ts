import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class TracksService {
  constructor(private prisma: PrismaService) {}
  async create(createTrackDto: CreateTrackDto) {
    const newTrack = { id: uuidv4(), ...createTrackDto };
    await this.prisma.track.create({
      data: newTrack,
    });
    return newTrack;
  }

  async findAll() {
    return this.prisma.track.findMany();
  }

  async findOne(id: string) {
    return this.prisma.track.findFirst({
      where: { id },
    });
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    await this.prisma.track.update({
      where: { id },
      data: updateTrackDto,
    });

    return { id, ...updateTrackDto };
  }

  async remove(id: string) {
    await this.prisma.track.delete({
      where: { id },
    });
  }

  async clearAlbum(albumId: string) {
    await this.prisma.track.updateMany({
      where: {
        albumId: albumId,
      },
      data: {
        albumId: null,
      },
    });
  }

  clearArtist(artistId: string) {
    this.prisma.track.updateMany({
      where: {
        artistId: artistId,
      },
      data: {
        artistId: null,
      },
    });
  }
}
