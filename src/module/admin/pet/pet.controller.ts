import {Controller, Get, Query, Render} from '@nestjs/common';
import { PetService } from "../../../service/pet/pet.service"
import {AdminUrlName} from "../../../../config/admin.config";



@Controller(`${AdminUrlName}/pet`)
export class PetController {
    constructor(
        private petService: PetService
    ) { }

    @Get()
    @Render("admin/pet/list")
    listPage(){
        return{}
    }


    @Get("pet-list-json")
    async __petListApi(
        @Query('page') pageNum: number = 1,
        @Query('limit') pageSize: number = 10,
    ){
        let list = await this.petService.adminList({
            pageNum,
            pageSize
        })
        console.log(list)
        return {
            code: 0,
            msg: 'ok',
            data: list
        }
    }

}
