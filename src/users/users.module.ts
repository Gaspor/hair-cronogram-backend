import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { EmailService } from 'src/email/email.service';
import { ActivateService } from 'src/activate/activate.service';
import { UsersController } from './users.controller';

@Module({
    imports: [JwtModule],
    providers: [UsersService, PrismaService, AuthService, EmailService, ActivateService],
    controllers: [UsersController]
})
export class UsersModule {}
