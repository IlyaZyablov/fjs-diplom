import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './schema/users.schema';
import mongoose, { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { ID } from '../../infrastructure/global';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private usersModel: Model<Users>) {}

  async create(createUserDto: CreateUserDto): Promise<Users> {
    const createdUser = new this.usersModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<Users[]> {
    return this.usersModel.find().select('email name contactPhone role').exec();
  }

  async findById(id: ID): Promise<Users> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Некорректный ID пользователя!');
    }

    const user = await this.usersModel.findById(id);
    if (!user) {
      throw new NotFoundException('Пользователь не найден!');
    }

    return user;
  }

  async findByEmail(email: string): Promise<Users> | null {
    const user = await this.usersModel.findOne({ email });

    return user;
  }
}
