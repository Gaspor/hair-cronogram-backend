import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma.service';
import { EmailService } from 'src/email/email.service';
import { ActivateService } from 'src/activate/activate.service';

@Module({
  imports: [JwtModule],
  controllers: [AuthController],
  providers: [AuthService, JwtService, UsersService, PrismaService, EmailService, ActivateService]
})
export class AuthModule {}
