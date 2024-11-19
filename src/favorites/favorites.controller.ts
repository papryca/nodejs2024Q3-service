import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  UnprocessableEntityException,
  NotFoundException,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  async addTrack(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    trackId: string,
  ) {
    const trackAdded = await this.favoritesService.addTrackToFavorites(trackId);
    if (trackAdded === false) {
      throw new UnprocessableEntityException(
        `Track with id ${trackId} does not exist`,
      );
    }
    if (!trackAdded) {
      throw new UnprocessableEntityException(
        `Track with id ${trackId} is already in favorites`,
      );
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return this.favoritesService.findAll();
  }
  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeTrack(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    trackId: string,
  ) {
    const trackExists = await this.favoritesService.removeTrackFromFavorites(trackId);
    if (trackExists === undefined) {
      throw new NotFoundException(
        `Track with id ${trackId} not found in favorites`,
      );
    }
    return;
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  async addAlbum(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    albumId: string,
  ) {
    const albumAdded = await this.favoritesService.addAlbumToFavorites(albumId);
    if (albumAdded === false) {
      throw new UnprocessableEntityException(
        `Album with id ${albumId} does not exist`,
      );
    }
    if (!albumAdded) {
      throw new UnprocessableEntityException(
        `Album with id ${albumId} is already in favorites`,
      );
    }
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAlbum(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    albumId: string,
  ) {
    const album = await this.favoritesService.removeAlbumFromFavorites(albumId);
    if (!album) {
      throw new NotFoundException(
        `Album with id ${albumId} not found in favorites`,
      );
    }
    return;
  }
  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  async addArtist(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    artistId: string,
  ) {
    const artist = await this.favoritesService.addArtistToFavorites(artistId);
    if (!artist) {
      throw new UnprocessableEntityException(
        `Artist with id ${artistId} does not exist`,
      );
    }
    return artist;
  }
  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeArtist(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    artistId: string,
  ) {
    const artist = await this.favoritesService.removeArtistFromFavorites(
      artistId,
    );
    if (!artist) {
      throw new NotFoundException(
        `Artist with id ${artistId} not found in favorites`,
      );
    }
    return;
  }
}
