import { HelpersService } from 'src/helpers/helpers.service';
import { User } from './../users/users.entity';
import { BadGatewayException, CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private HelpersService: HelpersService
    ) {
        
    }
    canActivate(context: ExecutionContext): boolean{
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization.split(' ')[1];

        if (!token) throw new BadGatewayException('Token not found!');

        const userData = this.HelpersService.verifyAccessToken(token);
        console.log(userData);
         
        request.user = userData;
        return true;
    }
}