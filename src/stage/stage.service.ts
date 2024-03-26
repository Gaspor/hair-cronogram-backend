import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class StageService {
    constructor(private prisma: PrismaService) {}
    
    async verifyUserCronogram(userId: string, cronogramId: number) {
        const cronogram = await this.prisma.cronogram.findFirst({
            where: {
                id: cronogramId,
                user: {
                    id: userId
                }
            }
        });
        
        return cronogram;
    }

    async verifyUserStage(stageId: number) {
        return await this.prisma.stage.findFirst({
            where: {
                id: stageId,
            }
        });
    }
    
    async create(userId: string, cronogramId: number, name: string) {
        if(!await this.verifyUserCronogram(userId, cronogramId)) {
            throw new UnauthorizedException();
        }
        
        const cronogramStage = await this.prisma.stage.create({
            data: {
                name,
                cronogram: {
                    connect: {
                        id: cronogramId
                    }
                }
            }
        });
        
        return cronogramStage;
    }
    
    async getAll(userId: string, cronogram: number) {
        const stages = await this.prisma.stage.findMany({
            where: {
                cronogram: {
                    id: cronogram,
                    user: {
                        id: userId
                    }
                }
            }
        });
        
        return stages;
    }
    
    async update(userId: string, id: number, name: string ) {
        const stageValues = await this.verifyUserStage(id);
        
        if(!stageValues) {
            throw new UnauthorizedException();            
        }
        
        if(!await this.verifyUserCronogram(userId, stageValues.cronogramId)) {
            throw new UnauthorizedException();                    
        }

        const stageUpdate = await this.prisma.stage.update({
            where: {
                id
            },
            data: {
                name
            }
        });

        return stageUpdate;
    }

    async updateCompleted(userId: string, id: number, isCompleted: boolean) {
        const stageValues = await this.verifyUserStage(id);
        
        if(!stageValues) {
            throw new UnauthorizedException();            
        }
        
        if(!await this.verifyUserCronogram(userId, stageValues.cronogramId)) {
            throw new UnauthorizedException();                    
        }

        if(isCompleted) {
            const stageUpdate = await this.prisma.stage.updateMany({
                where: {
                    id: {
                        lte: id
                    },
                    cronogramId: Number(stageValues.cronogramId)
                },
                data: {
                    isCompleted
                }
            });

            const stage = await this.prisma.stage.count({
                where: {
                    cronogramId: stageValues.cronogramId
                }
            });
            
            const stageCompleted = await this.prisma.stage.count({
                where: {
                    cronogramId: stageValues.cronogramId,
                    isCompleted: true
                }
            });
            
            if (stage === stageCompleted) {
                const stageUpdate = await this.prisma.stage.updateMany({
                    where: {
                        cronogramId: Number(stageValues.cronogramId)
                    },
                    data: {
                        isCompleted: false
                    }
                });
        
                return stageUpdate;
            }

            return stageUpdate;
        }

        const stageUpdate = await this.prisma.stage.updateMany({
            where: {
                    id: {
                        gte: id
                    },
                    cronogramId: Number(stageValues.cronogramId)
                },
                data: {
                    isCompleted
                }
            });

        return stageUpdate;
    }

    async delete(userId: string, id: number) {
        const stageValues = await this.verifyUserStage(id);
        
        if(!stageValues) {
            throw new UnauthorizedException();            
        }
        
        if(!await this.verifyUserCronogram(userId, stageValues.cronogramId)) {
            throw new UnauthorizedException();                    
        }
        
        try {
            const deleteStage = await this.prisma.stage.delete({
                where: {
                    id
                }
            });
            
            return deleteStage;
        } catch (error) {
            throw new UnauthorizedException();
            
        }
    }
}
