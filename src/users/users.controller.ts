import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('example')
  example(): boolean {
    return this.usersService.getExample();
  }
  @Post('create')
  create(@Body() {name, lastname} : {name: string, lastname: string}): {name: string, lastname: string} {
    return this.usersService.create({name,lastname});
  }


  @Put('update/:id')
  update(@Param(){id}: {id: string}): string {
    return id;
  }
  @Get('5') 
  findOne(@Query('id') id: string): string {
    return id;
  }

}