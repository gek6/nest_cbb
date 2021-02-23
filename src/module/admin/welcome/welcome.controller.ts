import { Controller, Get, Render } from '@nestjs/common';
import { AdminUrlName } from "../../../../config/admin.config"
@Controller(`${AdminUrlName}/welcome`)
export class WelcomeController {

    @Get()
    @Render("admin/welcome")
    welcomePage() {

        return {}
    }
}
