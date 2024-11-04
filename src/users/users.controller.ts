
import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { AuthGuard } from 'src/helpers/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('example')
  example(): boolean {
    return this.usersService.getExample();
  }
  @Post('create')
  create(@Body() user: User): Promise<User> {
    return this.usersService.create(user); 
  }

  @Get('5') 
  findOne(@Query('id') id: string): string {
    return id;
  }
  @Post('login')
  login(@Body() { email, password }: { email: string; password: string }): Promise<{
    token: string; refreshToken: string;
  }> {
    return this.usersService.login({ email, password });
  }
  @Put('update/profile')
  @UseGuards(AuthGuard)
  updateProfile(@Req() request, @Body() user: User): Promise<User> {
    return this.usersService.updateUserProfile(user, request);
  }
  @Delete('delete/:id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.usersService.deteteUser(+id);
  }
  @Get('profile')
  @UseGuards(AuthGuard) 
  ownerProfile(@Req() request): Promise<User> {
    return this.usersService.getOwnerProfile(request);
  }
  @Put('refresh/Token')
  refreshToken(@Req() request: any): Promise<{token: string, refreshToken: string}> {
    return this.usersService.refreshToken(request);
  }
}
