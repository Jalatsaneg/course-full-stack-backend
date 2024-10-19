import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    getExample(): boolean{
        return true;
    }
    create( { name, lastname }: { name: string, lastname: string }): { name: string, lastname: string }{
        return { name, lastname };
    }  
}