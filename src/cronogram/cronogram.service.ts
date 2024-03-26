import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CronogramService {
    constructor(private prisma: PrismaService) {}
    
    async create(name: string, user: string) {
        if(this.verifyIsActivated(user)) {
            await this.setAllDeactivated(user);
        }
        
        const cronogram = await this.prisma.cronogram.create({
            data: {
                name,
                user: {
                    connect: {
                        id: user
                    }
                }
            }
        });
        
        return cronogram;
    }
    
    async verifyIsActivated(user: string) {
        const cronogram = await this.prisma.cronogram.findFirst({
            where: {
                user: {
                    id: user
                }
            }
        });
        
        if(!cronogram) {
            return false;
        }
        
        return true;
    }
    
    async setAllDeactivated(user: string) {
        const cronogram = await this.prisma.cronogram.updateMany({
            where: {
                user: {
                    id: user
                },
                isActivated: true
            },
            data: {
                isActivated: false
            }
        });
    }
    
    async getAll(user: string) {
        const cronograms = await this.prisma.cronogram.findMany({
            where: {
                user: {
                    id: user
                }
            },
            include: {
                stages: {
                    orderBy: {
                        id: "asc"
                    }
                }
            },
            orderBy: [
                { isActivated: 'desc'},
                { id: 'asc' }
            ]
        });
        
        return cronograms;
    }

    async isOwned(userId: string, cronogramId: number) {
        return await this.prisma.cronogram.findFirst({
            where: {
                id: cronogramId,
                user: {
                    id: userId
                }
            }
        })
    }

    async update(user: string, cronogram: { id: number, name: string, isActivated: boolean }) {
        cronogram.id = Number(cronogram.id);
        
        if (!await this.isOwned(user, cronogram.id)) {
            throw new UnauthorizedException();
        }

        if(cronogram.isActivated) {
            await this.setAllDeactivated(user);
        }

        const cron = await this.prisma.cronogram.update({
            where: {
                id: cronogram.id,
                user: {
                    id: user
                }
            },
            data: {
                name: cronogram.name,
                isActivated: cronogram.isActivated
            }
        });

        return cron;
    }

    async delete(user: string, id: number) {
        try {
            const deleteCronogram = await this.prisma.cronogram.delete({
                where: {
                    id,
                    user: {
                        id: user
                    }
                }
            });
            
            return deleteCronogram;
        } catch (error) {
            throw new UnauthorizedException();
            
        }
    }
}
