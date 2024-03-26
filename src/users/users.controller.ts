import { Controller, Get, Request } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Get()
    async getUserData(@Request() req) {
        const { username } = req.user;
        return { username };
        
    }
}
