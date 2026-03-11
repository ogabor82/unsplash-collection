import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AddImageDto } from './dto/add-image.dto';
import { CollectionsService } from './collections.service';

@ApiTags('collections')
@Controller('collections')
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Get()
  getCollections() {
    return this.collectionsService.getCollections();
  }

  @Get(':collection-id')
  getCollectionById(@Param('collection-id') collectionId: string) {
    return this.collectionsService.getCollectionById(collectionId);
  }

  @Get(':collection-id/images')
  getCollectionImages(@Param('collection-id') collectionId: string) {
    return this.collectionsService.getCollectionImages(collectionId);
  }

  @Post(':collection-id/images')
  addImageToCollection(
    @Param('collection-id') collectionId: string,
    @Body() dto: AddImageDto,
  ) {
    return this.collectionsService.addImageToCollection(collectionId, dto);
  }

  @Delete(':collection-id/images/:image-id')
  removeImageFromCollection(
    @Param('collection-id') collectionId: string,
    @Param('image-id') imageId: string,
  ) {
    return this.collectionsService.removeImageFromCollection(collectionId, imageId);
  }
}
