import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { Hotels } from './schema/hotels.schema';
import { ID } from '../../infrastructure/global';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { JwtAuthGuard } from 'src/guard/auth.guard';
import { SearchParamsDto } from './dto/search-hotel.dto';
import { MulterFilesInterceptor } from 'src/interceptors/fileUpload.interceptor';

@Controller('api/hotels')
export class HotelsController {
  constructor(private hotelsService: HotelsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(MulterFilesInterceptor())
  createHotel(
    @Body() createHotelDto: CreateHotelDto,
    @UploadedFiles() images: Array<Express.Multer.File>,
  ): Promise<Hotels> {
    const data = { ...createHotelDto };

    if (images?.length) {
      data.images = images.map((img) => img.filename);
    }

    return this.hotelsService.create(data);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(MulterFilesInterceptor())
  updateHotel(
    @Param('id') hotelId: ID,
    @Body() updateHotelDto: UpdateHotelDto,
    @UploadedFiles() images: Array<Express.Multer.File>,
  ): Promise<Hotels> {
    return this.hotelsService.update(
      hotelId,
      updateHotelDto,
      images.map((img) => img.filename),
    );
  }

  @Get()
  searchHotels(@Query() searchParams: SearchParamsDto): Promise<Hotels[]> {
    return this.hotelsService.search(searchParams);
  }
}
