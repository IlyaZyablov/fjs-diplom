import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Hotels } from './schema/hotels.schema';
import mongoose, { Model } from 'mongoose';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { ID } from '../../infrastructure/global';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { SearchParamsDto } from './dto/search-hotel.dto';

@Injectable()
export class HotelsService {
  constructor(@InjectModel(Hotels.name) private hotelsModel: Model<Hotels>) {}

  async create(createHotelDto: CreateHotelDto): Promise<Hotels> {
    console.log('HotelService.create DEBUG');
    console.log(createHotelDto);

    const createdHotel = new this.hotelsModel(createHotelDto);
    return createdHotel.save();
  }

  async update(
    hotelId: ID,
    updateHotelDto: UpdateHotelDto,
    images: string[],
  ): Promise<Hotels> {
    console.log('HotelService.update DEBUG');
    console.log(hotelId);
    console.log(updateHotelDto);
    console.log(images);

    const hotel = await this.findById(hotelId);

    const data = { ...updateHotelDto, images: [...hotel.images, ...images] };

    return await this.hotelsModel.findByIdAndUpdate(
      { _id: hotelId },
      { $set: { ...data } },
      { new: true },
    );
  }

  async findById(hotelId: ID): Promise<Hotels> {
    const isValidId = mongoose.isValidObjectId(hotelId);
    if (!isValidId) {
      throw new BadRequestException('Некорректный ID отеля!');
    }

    const hotel = await this.hotelsModel.findById(hotelId);
    if (!hotel) {
      throw new NotFoundException('Отель по такому ID не найден!');
    }

    return hotel;
  }

  async search(params: SearchParamsDto): Promise<Hotels[]> {
    console.log('HotelService.search DEBUG');
    console.log(params);

    const { limit, offset, title } = params;
    const query = {
      title: { $regex: new RegExp(title, 'i') },
    };
    return await this.hotelsModel
      .find(query)
      .limit(limit ?? 0)
      .skip(offset ?? 0);
  }
}
