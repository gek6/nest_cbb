import {Controller, Get, Query, Render} from '@nestjs/common';
import {AddressService} from "../../../service/address/address.service";
import {AdminUrlName} from "../../../../config/admin.config";


@Controller(`${AdminUrlName}/address`)
export class AddressController {
    constructor(
        private addressService: AddressService
    ) { }

    @Get()
    @Render("admin/address/list")
    listPage(){
        return{}
    }


    @Get("address-list-json")
    async __petListApi(
        @Query('page') pageNum: number = 1,
        @Query('limit') pageSize: number = 10,
    ){
        let list = await this.addressService.list({
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
