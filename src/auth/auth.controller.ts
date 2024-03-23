import { Body, Controller, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
    constructor(private userService: UsersService) {}

    @Post('login')
    async login(@Request() req) {
        const { email, password } = req.body;    
        const userInfo = await this.userService.validateUser(email, password);
        return this.userService.login(userInfo);
    }

    @Post('register')
    async register(@Request() req) {
        const { email, password, username } = req.body;
        return this.userService.register(email, password, username);
    }
}
