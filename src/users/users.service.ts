import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';
import { ActivateService } from 'src/activate/activate.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService, private authService: AuthService, private activate: ActivateService){}
    
    async validateUser(email: string, password: string): Promise<any> {        
        const user = await this.prisma.user.findUnique({ where: { email } });
        
        if(!user) throw new UnauthorizedException({ message: "Invalid email or password!" });
        
        // if(!user.isActivated) throw new UnauthorizedException({ message: "User not activated yet!" });
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if(!isPasswordValid) throw new UnauthorizedException({ message: "Invalid email or password!" });
        
        return { id: user.id, email: user.email, username: user.username };
    }
    
    async login(user: any) {
        if(user.status == 401) return { user };
        
        return {
            access_token: await this.authService.generateJwtToken(user)
        };
    }
    
    async register(email: string, password: string, username: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        
        try {
            const user = await this.prisma.user.create({
                data: {
                    email,
                    username,
                    password: hashedPassword,
                    plainTextPassword: password,
                    isActivated: false,
                }
            });
            
            this.activate.sendEmail(user.email, user.id);
            
            return this.login(user);
        } catch (error) {
            return {
                message: "Have an error!",
                error
            }
        }
    }
}
