import { ConfigurableModuleBuilder, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { PrismaService } from './prisma.service';
import { CronogramModule } from './cronogram/cronogram.module';
import { StageModule } from './stage/stage.module';
import { AuthMiddleware } from './middleware/auth.middleware';

@Module({
  imports: [
    JwtModule.register({}),
    UsersModule, 
    AuthModule,
    CronogramModule,
    StageModule,
  ],
  controllers: [AppController],
  providers: [AppService, UsersService, AuthService, PrismaService],
  exports: [AuthService]
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).exclude({ path: 'auth/login', method: RequestMethod.ALL }, { path: 'auth/register', method: RequestMethod.ALL }).forRoutes('*');
  }
}
