import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class EmailService {
    constructor() {}

    async sendEmail(to: string, emailToken: string) {
        const resend = new Resend(process.env.RESEND_SECRET);

        console.log(`Sending email to: ${to}`);
        
        resend.emails.send({
            from: 'onboarding@resend.dev',
            to,
            subject: 'Ativar conta!',
            html: `
                Muito obrigado por se registrar, ative sua conta pelo link abaixo para usar todas as funcionalidades:
                <p>${process.env.HOST}/activate/${emailToken}</p>
            `
        });
    }
}
