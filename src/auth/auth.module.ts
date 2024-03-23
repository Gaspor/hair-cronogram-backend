import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [JwtModule],
  controllers: [AuthController],
  providers: [AuthService, JwtService, UsersService, PrismaService]
})
export class AuthModule {}
