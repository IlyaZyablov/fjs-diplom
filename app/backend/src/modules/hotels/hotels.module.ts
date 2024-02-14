import { Module } from '@nestjs/common';
import { HotelsController } from './hotels.controller';
import { HotelsService } from './hotels.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Hotels, HotelsSchema } from './schema/hotels.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Hotels.name, schema: HotelsSchema }]),
  ],
  controllers: [HotelsController],
  providers: [HotelsService],
})
export class HotelsModule {}
