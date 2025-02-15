import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { HelpersModule } from './helpers/helpers.module';
import { HelpersService } from './helpers/helpers.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    DatabaseModule,
    UsersModule,
    HelpersModule],
    providers: [HelpersService],
  // controllers: [AppController, UsersController],
  // providers: [AppService, UsersService],
})
export class AppModule {}