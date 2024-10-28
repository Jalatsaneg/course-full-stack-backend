import { ConfigService } from '@nestjs/config';
import { BadRequestException, Injectable } from '@nestjs/common';
const bcrypt = require('bcrypt');
import * as jwt from 'jsonwebtoken'; 
import { User } from 'src/users/users.entity';

@Injectable()
export class HelpersService {
  private jwtSecretKey: string;
  constructor(
    ConfigService: ConfigService
  ) {
    this.jwtSecretKey = ConfigService.get<string>('JWT_SECRET_KEY');
  }

  async hashPasswordFunction(passord: string): Promise<string> {
    const saltRounds = 10;

    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(passord, salt);

    return hash;
  }
  comparePassword(passord: string, hashPassword: string): boolean {
    const match = bcrypt.compareSync(passord, hashPassword); // true
    return match;
  }

  genToken(data: User): string {
    const token = jwt.sign(
      {
        data: data,
      },
      this.jwtSecretKey,
      { expiresIn: '1h' },
    );

    return token;
  }
  verifyAccessToken(token: string): User {
    try {
      console.log('=====');
      const decoded = jwt.verify(token, this.jwtSecretKey) as User;
      return decoded;
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }
}
