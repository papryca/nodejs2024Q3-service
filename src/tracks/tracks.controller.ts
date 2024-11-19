import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  BadRequestException,
  ParseUUIDPipe,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createTrackDto: CreateTrackDto) {
    if (!createTrackDto) {
      throw new BadRequestException(
        'Request body must contain required fields',
      );
    }
    return this.tracksService.create(createTrackDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return this.tracksService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
  ) {
    const track = await this.tracksService.findOne(id);
    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
    return track;
  }
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    const track = await this.tracksService.findOne(id);
    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
    return await this.tracksService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
  ) {
    const track = await this.tracksService.findOne(id);
    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
    await this.tracksService.remove(id);
  }
}
