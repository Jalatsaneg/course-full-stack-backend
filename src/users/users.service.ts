import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { HelpersService } from 'src/helpers/helpers.service';
import { console } from 'inspector';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private helpersService: HelpersService,
  ) {}

  getExample(): boolean {
    return false;
  }


  async create(user: User): Promise<User> {
    const hashPassword = await this.helpersService.hashPasswordFunction(
      user.password,
    );

    console.log('hashPassword: ', hashPassword);

    if (!user.firstname || !user.email || !user.password)
      throw new BadRequestException('Parameter is empty!.');

    const emailExist = await this.userRepository.findOneBy({
      email: user.email,
    });

    console.log({ emailExist });

    if (emailExist) throw new BadRequestException('Email already exist!.');

    const userCreated = await this.userRepository.save({
      ...user,
      password: hashPassword,
    });

    return userCreated;
  }
  async login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<{ token: string }> {
    // Validate data
    if (!email || !password)
      throw new BadRequestException('Email or password must required!.');

    // Check email alreay in database
    const existEmail: User = await this.userRepository.findOneBy({ email });
    if (!existEmail)
      throw new BadRequestException('Email or password incorrect!.');

    // Compare password in database and input passord
    const pwMatch = this.helpersService.comparePassword(
      password,
      existEmail?.password,
    );
    if (!pwMatch)
      throw new BadRequestException('Email or password incorrect!.');

    // Gen toke
    const data = {
      id: existEmail.id,
      firstname: existEmail.firstname,
      lastname: existEmail.lastname,
    } as User;

    const token = this.helpersService.genToken(data);
    return { token };
  }
  async updateUserProfile(user: User, request: any): Promise<User> {
    // Validate data input
    if (!user.firstname || !user.lastname)
      throw new BadRequestException('Parameter is empty!.');

    // Clear email from user input
    if (user.email) delete user.email;

    // Hash password if user input
    if (user.password) {
      const hashPW: string = await this.helpersService.hashPasswordFunction(
        user.password,
      );
      user.password = hashPW;
    }

    // Check user already in database
    const userDataFromToken = request.user;

    const id: number = userDataFromToken.data.id;
    const existUser: User = await this.userRepository.findOneById(id);
    if (!existUser) throw new BadRequestException('Not found your data!.');

    await this.userRepository.update(id, user);
    const userData: User = await this.userRepository.findOneById(id);
    return userData;
  }
  async deteteUser(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0){
      throw new BadRequestException('Not found your data!');
    }
  }
}

