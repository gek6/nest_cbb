import { Controller,Get,Render } from '@nestjs/common';
import { AdminUrlName } from "config/admin.config"
@Controller(AdminUrlName + '/system')
export class SystemController {

    @Get("index")
    @Render("admin/system/index")
    listPage(){
        return {

        }
    }
}
