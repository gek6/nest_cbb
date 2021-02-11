import { Controller, Get, Render } from '@nestjs/common';

@Controller('welcome')
export class WelcomeController {

    @Get()
    @Render("admin/welcome")
    welcomePage(){

        return {}
    }
}
