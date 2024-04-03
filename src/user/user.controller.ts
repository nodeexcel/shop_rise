import { Controller, Post, Body, Res, HttpException, HttpStatus, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import {User} from '../data-service/entities/user.entity'
// import { ExistenceCheckInterceptor } from '../common/interceptors/isUserExist';

@Controller('user')
export class userController {
  constructor(private readonly userService: UserService) {}


   @Post('signup')
//    @UseInterceptors(ExistenceCheckInterceptor)
    async signup(@Body() user:User, @Res() response:Response) {
        try{
            const userData = await this.userService.createUser(user);
            response.status(201).send({success:true, message:"signup successfully", data:userData})
        }catch(error){
          if(error instanceof HttpException) throw error;
          throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Post('signin')
    // @UseInterceptors(ExistenceCheckInterceptor)
    async signin(@Body() user:User, @Res() response:Response){
        try{
            const userData = await this.userService.fetchOne(user.email);
            // const isValid = await bcrypt.compare(user.password, userData.password);
            // if(!isValid)
            //  throw new HttpException('password or username incorrect' , HttpStatus.NON_AUTHORITATIVE_INFORMATION)
            // const accessToken =await jwtHelper.generateToken({userName:userData.userName ,id:userData.id}) 
            // response.cookie("accessToken", accessToken)
            response.status(200).send({success:true, message:"signin successfully", data:userData})    
        }catch(error){
            if(error instanceof HttpException) throw error
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}