import { Body, Controller, Get, Post, Render } from '@nestjs/common';

@Controller('login')
export class LoginController {

    @Get()
    @Render('admin/login')
    loginPage(){

        return {

        }
    }

    @Post()
    __login(@Body() Body){
        console.log(Body);
        return {
            code:200
        }
    }
}
