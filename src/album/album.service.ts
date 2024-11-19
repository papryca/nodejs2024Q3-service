import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { v4 as uuid } from 'uuid';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const newAlbum = {
      id: uuid(),
      ...createAlbumDto,
    };
    await this.prisma.album.create({
      data: newAlbum,
    });
    return newAlbum;
  }

  async findAll() {
    return await this.prisma.album.findMany();
  }

  async findOne(id: string) {
    return this.prisma.album.findFirst({
      where: { id },
    });
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    return await this.prisma.album.update({
      where: { id },
      data: updateAlbumDto,
    });
  }

  async remove(id: string) {
    await this.prisma.album.delete({
      where: { id },
    });
  }

  findByIds(ids: string[]) {
    return this.prisma.album.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  clearArtist(artistId: string) {
    this.prisma.album.updateMany({
      where: {
        artistId: artistId,
      },
      data: {
        artistId: null,
      },
    });
  }
}
