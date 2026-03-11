import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AddImageDto } from './dto/add-image.dto';

@Injectable()
export class CollectionsService {
  constructor(private readonly prisma: PrismaService) {}

  getCollections() {
    return this.prisma.collection.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: {
            images: true,
          },
        },
      },
    });
  }

  async getCollectionById(collectionId: string) {
    const collection = await this.prisma.collection.findUnique({
      where: { id: collectionId },
      include: {
        images: {
          include: {
            image: true,
          },
          orderBy: {
            addedAt: 'desc',
          },
        },
        _count: {
          select: {
            images: true,
          },
        },
      },
    });

    if (!collection) {
      throw new NotFoundException(`Collection with id '${collectionId}' not found.`);
    }

    return {
      ...collection,
      images: collection.images.map((link) => ({ ...link.image, addedAt: link.addedAt })),
    };
  }

  async getCollectionImages(collectionId: string) {
    await this.ensureCollectionExists(collectionId);

    const links = await this.prisma.collectionImage.findMany({
      where: { collectionId },
      include: { image: true },
      orderBy: { addedAt: 'desc' },
    });

    return links.map((link) => ({ ...link.image, addedAt: link.addedAt }));
  }

  async addImageToCollection(collectionId: string, dto: AddImageDto) {
    await this.ensureCollectionExists(collectionId);

    const image = await this.prisma.image.upsert({
      where: { unsplashId: dto.unsplashId },
      update: {
        slug: dto.slug,
        description: dto.description,
        altDescription: dto.altDescription,
        rawUrl: dto.rawUrl,
        fullUrl: dto.fullUrl,
        regularUrl: dto.regularUrl,
        smallUrl: dto.smallUrl,
        thumbUrl: dto.thumbUrl,
        width: dto.width,
        height: dto.height,
        color: dto.color,
        authorName: dto.authorName,
        authorUsername: dto.authorUsername,
        authorProfileUrl: dto.authorProfileUrl,
        unsplashPageUrl: dto.unsplashPageUrl,
      },
      create: {
        unsplashId: dto.unsplashId,
        slug: dto.slug,
        description: dto.description,
        altDescription: dto.altDescription,
        rawUrl: dto.rawUrl,
        fullUrl: dto.fullUrl,
        regularUrl: dto.regularUrl,
        smallUrl: dto.smallUrl,
        thumbUrl: dto.thumbUrl,
        width: dto.width,
        height: dto.height,
        color: dto.color,
        authorName: dto.authorName,
        authorUsername: dto.authorUsername,
        authorProfileUrl: dto.authorProfileUrl,
        unsplashPageUrl: dto.unsplashPageUrl,
      },
    });

    await this.prisma.collectionImage.upsert({
      where: {
        collectionId_imageId: {
          collectionId,
          imageId: image.id,
        },
      },
      update: {},
      create: {
        collectionId,
        imageId: image.id,
      },
    });

    return this.prisma.collectionImage.findUnique({
      where: {
        collectionId_imageId: {
          collectionId,
          imageId: image.id,
        },
      },
      include: { image: true, collection: true },
    });
  }

  async removeImageFromCollection(collectionId: string, imageId: string) {
    await this.ensureCollectionExists(collectionId);
    await this.ensureImageExists(imageId);

    try {
      await this.prisma.collectionImage.delete({
        where: {
          collectionId_imageId: {
            collectionId,
            imageId,
          },
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(
          `Image with id '${imageId}' is not part of collection '${collectionId}'.`,
        );
      }

      throw error;
    }

    return { success: true };
  }

  private async ensureCollectionExists(collectionId: string) {
    const collection = await this.prisma.collection.findUnique({
      where: { id: collectionId },
      select: { id: true },
    });

    if (!collection) {
      throw new NotFoundException(`Collection with id '${collectionId}' not found.`);
    }
  }

  private async ensureImageExists(imageId: string) {
    const image = await this.prisma.image.findUnique({
      where: { id: imageId },
      select: { id: true },
    });

    if (!image) {
      throw new NotFoundException(`Image with id '${imageId}' not found.`);
    }
  }
}
