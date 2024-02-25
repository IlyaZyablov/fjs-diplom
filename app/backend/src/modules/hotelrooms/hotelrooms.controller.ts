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
import { HotelroomsService } from './hotelrooms.service';
import { JwtAuthGuard } from '../../guard/auth.guard';
import { MulterFilesInterceptor } from 'src/interceptors/fileUpload.interceptor';
import { CreateRoomDto } from './dto/create-room.dto';
import { HotelRooms } from './schema/hotelrooms.schema';
import { ID } from '../../infrastructure/global';
import { UpdateRoomDto } from './dto/update-room.dto';
import { SearchRoomParamsDto } from './dto/search-room.dto';
import { RolesGuard } from '../../guard/roles.guard';
import { Roles } from '../../decorators/roles.decorator';

@Controller('api/rooms')
export class HotelroomsController {
  constructor(private hotelroomsService: HotelroomsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @UseInterceptors(MulterFilesInterceptor())
  createRoom(
    @Body() createRoomDto: CreateRoomDto,
    @UploadedFiles() images: Array<Express.Multer.File>,
  ): Promise<HotelRooms> {
    const data = { ...createRoomDto };

    if (images?.length) {
      data.images = images.map((img) => img.filename);
    }

    return this.hotelroomsService.create(data);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @UseInterceptors(MulterFilesInterceptor())
  updateRoom(
    @Param('id') roomId: ID,
    @Body() updateRoomDto: UpdateRoomDto,
    @UploadedFiles() images: Array<Express.Multer.File>,
  ): Promise<HotelRooms> {
    return this.hotelroomsService.update(
      roomId,
      updateRoomDto,
      images.map((img) => img.filename),
    );
  }

  @Get()
  searchHotels(
    @Query() searchParams: SearchRoomParamsDto,
  ): Promise<HotelRooms[]> {
    return this.hotelroomsService.search(searchParams);
  }
}
