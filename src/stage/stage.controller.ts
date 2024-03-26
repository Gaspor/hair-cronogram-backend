import { Body, Controller, Delete, Get, Param, Post, Put, Request } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { StageService } from './stage.service';

@Controller('stage')
export class StageController {
    constructor(private stageService: StageService) {}

    @Post()
    async create(@Request() req) {
        const { cronogram, name } = req.body;
        const userId = req.user.id;
        return this.stageService.create(userId, Number(cronogram), name);
    }

    @Get()
    async findAll(@Request() req) {
        const userId = req.user.id;
        const cronogram = Number(req.body.cronogram);
        return this.stageService.getAll(userId, cronogram);
    }

    @Put(':id')
    async update(@Request() req, @Param('id') id: number) {
        const user = req.user.id;
        const { name } = req.body;
        
        return this.stageService.update(user, Number(id), name);
    }

    @Put('completed/:id')
    async updateCompleted(@Request() req, @Param('id') id: number) {
        const user = req.user.id;
        const { isCompleted } = req.body;
        
        return this.stageService.updateCompleted(user, Number(id), isCompleted);
    }

    @Delete(':id')
    async delete(@Request() req, @Param('id') id: number) {
        const user = req.user.id;
        return this.stageService.delete(user, Number(id));
    }
}
