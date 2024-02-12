import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './schema/users.schema';
import { JwtAuthGuard } from '../../guard/auth.guard';

@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/findall')
  @UseGuards(new JwtAuthGuard())
  findAll(): Promise<Users[]> {
    return this.usersService.findAll();
  }
}
