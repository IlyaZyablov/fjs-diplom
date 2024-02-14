import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateHotelDto {
  @IsNotEmpty({
    message: 'Название отеля является обязательным для заполнения полем',
  })
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsOptional()
  @IsArray()
  readonly images?: string[];
}
