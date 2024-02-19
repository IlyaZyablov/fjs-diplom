import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { JwtAuthGuard } from 'src/guard/auth.guard';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body() signUpDto: SignUpDto,
  ): Promise<{ token: string; role: string }> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/signin')
  signIn(
    @Body() signInDto: SignInDto,
  ): Promise<{ token: string; role: string }> {
    return this.authService.signIn(signInDto);
  }

  @Get('/checkauth')
  @UseGuards(new JwtAuthGuard())
  checkAuth(@Query() data: { email: string }): Promise<{ role: string }> {
    return this.authService.checkAuth(data);
  }
}
