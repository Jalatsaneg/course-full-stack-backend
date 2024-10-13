import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get('user')
  hello(): string {
    return 'Hi';
  }

  @Post('name')
  create(@Body() { name, lastname }: { name: string, lastname: string }): { name: string, lastname: string } {
    return { name, lastname };
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