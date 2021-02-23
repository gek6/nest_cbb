import { Controller, Get, Render } from '@nestjs/common';
import { AdminUrlName } from "config/admin.config"
@Controller(AdminUrlName + '/banner')
export class BannerController {
    @Get()
    @Render("admin/banner/index")
    indexPage(){
        return{}
    }
}
