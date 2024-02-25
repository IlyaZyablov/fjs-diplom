import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { JwtAuthGuard } from 'src/guard/auth.guard';
import { ReservationDto } from './dto/reservation.dto';
import { Reservations } from './schema/reservations.schema';
import { ID } from '../../infrastructure/global';

@UseGuards(JwtAuthGuard)
@Controller('api/reservations')
export class ReservationsController {
  constructor(private reservationsService: ReservationsService) {}

  @Post()
  addReservation(
    @Body() reservationDto: ReservationDto,
  ): Promise<Reservations> {
    return this.reservationsService.addReservation(reservationDto);
  }

  @Delete(':id')
  removeReservation(
    @Param('id') reservationId: ID,
    @Body() data: { userId: ID },
  ): Promise<Reservations> {
    return this.reservationsService.removeReservation(
      reservationId,
      data.userId,
    );
  }

  @Get()
  searchReservations(
    @Query() searchParams: Partial<ReservationDto>,
  ): Promise<Reservations[]> {
    return this.reservationsService.searchReservations(searchParams);
  }
}
