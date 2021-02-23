import { userInfo } from 'os';
import { Controller, Get, Render,Request } from '@nestjs/common';
import { AdminUrlName } from "../../../../config/admin.config"

@Controller(`${AdminUrlName}/index`)
export class IndexController {


    @Get()
    @Render("admin/index")
    indexPage(@Request() req){
        return {
            userInfo:req.session['userInfo'],
            AdminUrlName
        }
    } 
}
