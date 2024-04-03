import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service'
import { userModule } from './user/user.module';

@Module({
  imports: [
  ConfigModule.forRoot(),  
  TypeOrmModule.forRoot({
    type: 'mysql',
    host:process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: true
  }),
   userModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
