import { Injectable } from '@nestjs/common';
import { EmailService } from 'src/email/email.service';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ActivateService {
    constructor(private prisma: PrismaService, private email: EmailService) {}

    async sendEmail(email: string, user: string) {
        return await this.email.sendEmail(email, user);
    }

    async active(user: string, token: string) {
        const active = await this.prisma.user.update({
            where: {
                id: user
            },
            data: {
                isActivated: true
            }
        });
    }

}
