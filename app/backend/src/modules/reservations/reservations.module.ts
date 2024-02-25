import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Reservations, ReservationsSchema } from './schema/reservations.schema';
import { UsersModule } from '../users/users.module';
import { HotelsModule } from '../hotels/hotels.module';
import { HotelroomsModule } from '../hotelrooms/hotelrooms.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Reservations.name, schema: ReservationsSchema },
    ]),
    UsersModule,
    HotelsModule,
    HotelroomsModule,
  ],
  providers: [ReservationsService],
  controllers: [ReservationsController],
})
export class ReservationsModule {}
