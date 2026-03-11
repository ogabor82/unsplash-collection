import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SearchPhotosQueryDto } from './dto/search-photos.query.dto';

@Injectable()
export class UnsplashService {
  private readonly baseUrl = 'https://api.unsplash.com';

  constructor(private readonly configService: ConfigService) {}

  searchPhotos(query: SearchPhotosQueryDto) {
    const searchQuery = this.resolveSearchQuery(query);
    const params = new URLSearchParams({ query: searchQuery });

    if (query.page !== undefined) {
      params.set('page', String(query.page));
    }

    const perPage = query.perPage ?? query.per_page;
    if (perPage !== undefined) {
      params.set('per_page', String(perPage));
    }

    if (query.orientation) {
      params.set('orientation', query.orientation);
    }

    return this.callUnsplash(`/search/photos?${params.toString()}`);
  }

  getPhotoById(photoId: string) {
    return this.callUnsplash(`/photos/${encodeURIComponent(photoId)}`);
  }

  private resolveSearchQuery(query: SearchPhotosQueryDto) {
    const rawQuery = query.query ?? query.q ?? query.keywords;
    const normalizedQuery = rawQuery?.trim();

    if (!normalizedQuery) {
      throw new BadRequestException(
        "Missing search keyword. Provide one of: 'query', 'q', or 'keywords'.",
      );
    }

    return normalizedQuery;
  }

  private async callUnsplash(path: string) {
    const accessKey = this.getAccessKey();

    let response: Response;
    try {
      response = await fetch(`${this.baseUrl}${path}`, {
        headers: {
          Authorization: `Client-ID ${accessKey}`,
          'Accept-Version': 'v1',
        },
      });
    } catch {
      throw new ServiceUnavailableException('Failed to reach Unsplash API.');
    }

    const payload = await this.parseJsonSafely(response);

    if (!response.ok) {
      const message = this.extractUnsplashErrorMessage(payload);
      throw new HttpException(message, response.status);
    }

    return payload;
  }

  private getAccessKey() {
    const accessKey =
      this.configService.get<string>('UNSPLASH_ACCESS_KEY') ??
      this.configService.get<string>('UNSPLASH_API_KEY');

    if (!accessKey) {
      throw new InternalServerErrorException(
        'Missing Unsplash access key. Set UNSPLASH_ACCESS_KEY in server environment.',
      );
    }

    return accessKey;
  }

  private async parseJsonSafely(response: Response) {
    try {
      return await response.json();
    } catch {
      throw new HttpException('Unexpected response from Unsplash API.', HttpStatus.BAD_GATEWAY);
    }
  }

  private extractUnsplashErrorMessage(payload: unknown) {
    if (
      payload &&
      typeof payload === 'object' &&
      'errors' in payload &&
      Array.isArray((payload as { errors: unknown }).errors)
    ) {
      const errors = (payload as { errors: unknown[] }).errors
        .filter((error): error is string => typeof error === 'string')
        .join(', ');

      if (errors) {
        return errors;
      }
    }

    return 'Unsplash API request failed.';
  }
}
