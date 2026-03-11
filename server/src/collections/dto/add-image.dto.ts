import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddImageDto {
  @IsString()
  @IsNotEmpty()
  unsplashId!: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  altDescription?: string;

  @IsOptional()
  @IsString()
  rawUrl?: string;

  @IsOptional()
  @IsString()
  fullUrl?: string;

  @IsOptional()
  @IsString()
  regularUrl?: string;

  @IsOptional()
  @IsString()
  smallUrl?: string;

  @IsOptional()
  @IsString()
  thumbUrl?: string;

  @IsOptional()
  @IsInt()
  width?: number;

  @IsOptional()
  @IsInt()
  height?: number;

  @IsOptional()
  @IsString()
  color?: string;

  @IsString()
  @IsNotEmpty()
  authorName!: string;

  @IsOptional()
  @IsString()
  authorUsername?: string;

  @IsOptional()
  @IsString()
  authorProfileUrl?: string;

  @IsOptional()
  @IsString()
  unsplashPageUrl?: string;
}
