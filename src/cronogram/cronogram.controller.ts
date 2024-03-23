import { Body, Controller, Delete, Get, Param, Post, Put, Request } from '@nestjs/common';
import { CronogramService } from './cronogram.service';

@Controller('cronogram')
export class CronogramController {
    constructor(private cronogramService: CronogramService) {}

    @Post()
    async create(@Request() req) {
        const name = req.body.name;
        const userId = Number(req.user.id);
        return this.cronogramService.create(name, userId);
    }

    @Get()
    async findAll(@Request() req) {
        const user = Number(req.user.id);
        return this.cronogramService.getAll(user);
    }

    @Put(':id')
    async update(@Request() req, @Param('id') id: number) {
        const user = Number(req.user.id);
        let cronogram = req.body;
        cronogram = { id, ...cronogram };
        
        
        return this.cronogramService.update(user, cronogram);
    }

    @Delete(':id')
    async delete(@Request() req, @Param('id') id: number) {
        const user = Number(req.user.id);
        return this.cronogramService.delete(user, Number(id));
    }
}
