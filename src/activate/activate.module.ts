import { Module } from '@nestjs/common';
import { ActivateController } from './activate.controller';
import { ActivateService } from './activate.service';
import { PrismaService } from 'src/prisma.service';
import { EmailService } from 'src/email/email.service';

@Module({
    controllers: [ ActivateController ],
    providers: [ ActivateService, PrismaService, EmailService ]
})
export class ActivateModule {}
