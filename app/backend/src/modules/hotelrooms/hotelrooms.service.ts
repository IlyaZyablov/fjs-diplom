import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HotelRooms } from './schema/hotelrooms.schema';
import mongoose, { Model } from 'mongoose';
import { CreateRoomDto } from './dto/create-room.dto';
import { ID } from '../../infrastructure/global';
import { UpdateRoomDto } from './dto/update-room.dto';
import { SearchRoomParamsDto } from './dto/search-room.dto';

@Injectable()
export class HotelroomsService {
  constructor(
    @InjectModel(HotelRooms.name) private hotelroomsModel: Model<HotelRooms>,
  ) {}

  async create(createRoomDto: CreateRoomDto): Promise<HotelRooms> {
    console.log('HotelroomsService.create DEBUG');
    console.log(createRoomDto);

    const isValidId = mongoose.isValidObjectId(createRoomDto.hotel);
    if (!isValidId) {
      throw new BadRequestException('Некорректный ID отеля!');
    }

    const createdRoom = new this.hotelroomsModel(createRoomDto);
    return createdRoom.save();
  }

  async update(
    roomId: ID,
    updateRoomDto: UpdateRoomDto,
    images: string[],
  ): Promise<HotelRooms> {
    console.log('HotelroomsService.update DEBUG');
    console.log(roomId);
    console.log(updateRoomDto);
    console.log(images);

    const room = await this.findById(roomId);

    const data = { ...updateRoomDto, images: [...room.images, ...images] };

    return await this.hotelroomsModel.findByIdAndUpdate(
      { _id: roomId },
      { $set: { ...data } },
      { new: true },
    );
  }

  async findById(roomId: ID): Promise<HotelRooms> {
    const isValidId = mongoose.isValidObjectId(roomId);
    if (!isValidId) {
      throw new BadRequestException('Некорректный ID комнаты!');
    }

    const room = await this.hotelroomsModel.findById(roomId);
    if (!room) {
      throw new NotFoundException('Отель по такому ID не найден!');
    }

    return room;
  }

  async search(params: SearchRoomParamsDto): Promise<HotelRooms[]> {
    console.log('HotelroomsService.search DEBUG');
    console.log(params);

    const { limit, offset, hotel, isEnabled } = params;
    const query: Partial<SearchRoomParamsDto> = {
      hotel,
    };

    if (typeof isEnabled !== 'undefined') {
      query.isEnabled = isEnabled;
    }

    return await this.hotelroomsModel
      .find(query)
      .limit(limit ?? 0)
      .skip(offset ?? 0);
  }
}
