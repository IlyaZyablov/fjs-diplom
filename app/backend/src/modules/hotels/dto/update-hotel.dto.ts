import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateHotelDto {
  @IsOptional()
  @IsString()
  readonly title?: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsOptional()
  @IsArray()
  readonly images?: string[];
}
