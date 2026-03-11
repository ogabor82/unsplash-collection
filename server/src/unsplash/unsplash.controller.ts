import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SearchPhotosQueryDto } from './dto/search-photos.query.dto';
import { UnsplashService } from './unsplash.service';

@ApiTags('unsplash')
@Controller('unsplash')
export class UnsplashController {
  constructor(private readonly unsplashService: UnsplashService) {}

  @Get('search/photos')
  searchPhotos(@Query() query: SearchPhotosQueryDto) {
    return this.unsplashService.searchPhotos(query);
  }

  @Get('photos/:id')
  getPhotoById(@Param('id') id: string) {
    return this.unsplashService.getPhotoById(id);
  }
}
