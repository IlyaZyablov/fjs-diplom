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
    try {
      const isValidId = mongoose.isValidObjectId(createRoomDto.hotel);
      if (!isValidId) {
        throw new BadRequestException('Некорректный ID отеля!');
      }

      const data = {
        ...createRoomDto,
        isEnabled: true,
      };

      const createdRoom = new this.hotelroomsModel(data);
      return createdRoom.save();
    } catch (error) {
      console.log('[ERROR]: HotelroomsService.create error:');
      console.error(error);
    }
  }

  async update(
    roomId: ID,
    updateRoomDto: UpdateRoomDto,
    images: string[],
  ): Promise<HotelRooms> {
    try {
      // const room = await this.findById(roomId);

      // const data = { ...updateRoomDto, images: [...room.images, ...images] };
      const data = { ...updateRoomDto, images };

      return await this.hotelroomsModel.findByIdAndUpdate(
        { _id: roomId },
        { $set: { ...data } },
        { new: true },
      );
    } catch (error) {
      console.log('[ERROR]: HotelroomsService.update error:');
      console.error(error);
    }
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
    const { limit, offset, hotel, isEnabled, title } = params;
    const query: Partial<SearchRoomParamsDto> = {
      hotel,
      title: { $regex: new RegExp(title, 'i') },
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