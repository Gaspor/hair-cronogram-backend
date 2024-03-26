import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    async generateJwtToken(user: any): Promise<string> {
        const payload = { id: user.id, email: user.email, username: user.username };
        return this.jwtService.sign(payload, { secret: process.env.JWT_SECRET, expiresIn: '1d' });
    }
    
    async verifyJwtToken(token: string): Promise<any> {
        return await this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
    }
}
