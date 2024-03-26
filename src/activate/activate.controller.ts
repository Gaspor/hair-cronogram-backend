import { Controller, Param, Post, Request } from '@nestjs/common';
import { ActivateService } from './activate.service';

@Controller('activate')
export class ActivateController {
    constructor(private activateService: ActivateService) {}

    @Post('sendemail')
    async sendEmail(@Request() req) {
        const user = req.user.id;
        const email = req.user.email;
        return this.activateService.sendEmail(user, email);
    }

    @Post(':id')
    async activeAccount(@Request() req, @Param() id: string) {
        const user = req.user.id;
        const token = id;
        return this.activateService.active(user, token);
        
    }
}
