import { Transform, Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

const ORIENTATIONS = ['landscape', 'portrait', 'squarish'] as const;

type Orientation = (typeof ORIENTATIONS)[number];

function toOptionalString(value: unknown) {
  if (Array.isArray(value)) {
    return value.length > 0 ? String(value[0]) : undefined;
  }

  if (value === undefined || value === null) {
    return undefined;
  }

  return String(value);
}

export class SearchPhotosQueryDto {
  @IsOptional()
  @Transform(({ value }) => toOptionalString(value))
  @IsString()
  query?: string;

  @IsOptional()
  @Transform(({ value }) => toOptionalString(value))
  @IsString()
  q?: string;

  @IsOptional()
  @Transform(({ value }) => toOptionalString(value))
  @IsString()
  keywords?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @Transform(({ value }) => (value === undefined ? undefined : Number(value)))
  @IsInt()
  @Min(1)
  @Max(30)
  perPage?: number;

  @IsOptional()
  @Transform(({ value }) => (value === undefined ? undefined : Number(value)))
  @IsInt()
  @Min(1)
  @Max(30)
  per_page?: number;

  @IsOptional()
  @IsIn(ORIENTATIONS)
  orientation?: Orientation;
}
