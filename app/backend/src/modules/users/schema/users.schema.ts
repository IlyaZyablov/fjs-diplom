import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UsersDocument = HydratedDocument<Users>;

@Schema()
export class Users {
  @Prop({
    unique: [true, 'Пользователь с данным email уже зарегистрирован!'],
  })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  contactPhone: string;

  @Prop({ default: 'client' })
  role: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
