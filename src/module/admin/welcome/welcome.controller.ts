import { Controller, Get, Render } from '@nestjs/common';

@Controller('admin/welcome')
export class WelcomeController {

    @Get()
    @Render("admin/welcome")
    welcomePage(){

        return {}
    }
}
