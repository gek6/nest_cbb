import { Controller, Get, Render ,Query} from '@nestjs/common';
import { AdminUrlName } from "config/admin.config"
import { BannerService } from "../../../service/banner/banner.service"

@Controller(AdminUrlName + '/banner')
export class BannerController {

    constructor(
        private bannerService: BannerService
    ) { }


    @Get()
    @Render("admin/banner/index")
    indexPage(){
        return{}
    }

    @Get("addPage")
    @Render("admin/banner/addForm")
    addPage(){
        return {}
    }

    @Get("banner-list-json")
    async __list(

        @Query('page') pageNum: number = 1,
        @Query('limit') pageSize: number = 10,
    ) {



        let list = await this.bannerService.list({
            pageNum,
            pageSize
        })

        //   console.log(list);

        return {
            code: 0,
            msg: 'ok',
            data: list
        }
    }
}
