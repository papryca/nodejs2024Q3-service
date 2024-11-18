import { Injectable } from "@nestjs/common";
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { v4 as uuid } from 'uuid';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}
  create(createArtistDto: CreateArtistDto) {
    const newArtist = { id: uuid(), ...createArtistDto };
    return this.prisma.artist.create({
      data: newArtist,
    });
  }

  findAll() {
    return this.prisma.artist.findMany();
  }
  findByIds(ids: string[]) {
    return this.prisma.artist.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
  findOne(id: string) {
    return this.prisma.artist.findFirst({
      where: {
        id,
      },
    });
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    return this.prisma.artist.update({
      where: {
        id,
      },
      data: updateArtistDto,
    });
  }

  remove(id: string) {
    return this.prisma.artist.delete({
      where: {
        id,
      },
    });
  }
}
