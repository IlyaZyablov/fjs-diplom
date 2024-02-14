import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { HotelsModule } from './modules/hotels/hotels.module';
import { HotelroomsModule } from './modules/hotelrooms/hotelrooms.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    UsersModule,
    AuthModule,
    HotelsModule,
    HotelroomsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
