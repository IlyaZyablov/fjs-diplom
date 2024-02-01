import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { email, password, name, contactPhone } = signUpDto;

    const userData = await this.userService.findByEmail(email);
    if (userData) {
      throw new UnauthorizedException(
        'Пользователь с указанным email уже существует!',
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await this.userService.create({
      email,
      passwordHash,
      name,
      contactPhone: contactPhone || 'Не указан',
    });

    const token = this.jwtService.sign({ email: newUser.email });
    return { token };
  }

  async signIn(signInDto: SignInDto): Promise<{ token: string }> {
    const { email, password } = signInDto;

    const userData = await this.userService.findByEmail(email);
    if (!userData) {
      throw new NotFoundException('Неправильный email или пароль!');
    }

    const isPasswordMatched = await bcrypt.compare(
      password,
      userData.passwordHash,
    );

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Неправильный email или пароль!');
    }

    const token = this.jwtService.sign({ email: userData.email });
    return { token };
  }
}
