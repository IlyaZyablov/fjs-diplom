import { Module } from '@nestjs/common';
import { HotelroomsController } from './hotelrooms.controller';
import { HotelroomsService } from './hotelrooms.service';
import { MongooseModule } from '@nestjs/mongoose';
import { HotelRooms, HotelRoomsSchema } from './schema/hotelrooms.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: HotelRooms.name, schema: HotelRoomsSchema },
    ]),
  ],
  controllers: [HotelroomsController],
  providers: [HotelroomsService],
})
export class HotelroomsModule {}
