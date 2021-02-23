import { Controller, Get, Render } from '@nestjs/common';
import { AdminUrlName } from "config/admin.config"
@Controller(AdminUrlName + '/order')
export class OrderController {

    @Get()
    @Render("admin/order/index")
    indexPage(){
        return  {}
    }
}
