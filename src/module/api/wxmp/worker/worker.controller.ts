import { Body, Controller, Get, Post, Query, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

import { UserService } from 'src/service/user/user.service';
import { WorkerService } from 'src/service/worker/worker.service';
import { WorkerApplyDto,WorkerServiceSettingDto } from "./dto"


@Controller('api/worker')
@ApiTags('铲屎官')
@ApiBearerAuth()
export class WorkerController {
    constructor(
        private readonly workerService: WorkerService,
        private readonly userService: UserService
    ) { }
    @Get()
    @ApiOperation({
        summary: `获取铲屎官信息`
    })
    __info() {
        return {
            code: 0,
            msg: 'ok'
        }
    }

    @Post()
    @ApiOperation({
        summary: `铲屎官入驻`
    })
    async __apply(@Body() postData: WorkerApplyDto, @Request() req) {
        let openid: string = req.tokenInfo['openid'];
        let user = await this.userService.findByOpenid(openid);
        try {
            await this.workerService.apply(user._id, postData);
            return {
                code: 0,
                msg: 'ok'
            }
        } catch (error) {
            return {
                code: -1,
                msg: error.message
            }
        }

    }

    @Post("setting")
    @ApiOperation({
        summary:"铲屎官服务设置"
    })
    async __workerSetting(
        @Body() postData:WorkerServiceSettingDto ,
        @Request() req
    ){
        let openid: string = req.tokenInfo['openid'];
        let user = await this.userService.findByOpenid(openid);
        let rs = await this.workerService.saveSetting(user._id , postData)
        return {
            code:0,
            msg:'ok',
            data:rs
        }
    }


    @Get("matching")

    @ApiOperation({
        summary: `匹配范围内的可用铲屎官`
    })
    @ApiQuery({
        name: 'lng',
        type: Number,
        example: '108.132',
        description: '经度',
    })
    @ApiQuery({
        name: 'lat',
        type: Number,
        example: '34.132',
        description: '纬度',
    })
    async __matching(
        @Query('lng') lng ,
        @Query('lat') lat
    ) {
        let rs = await this.workerService.matchingWorker({
            lng,
            lat
        })
        return {
            code: 0,
            msg: 'ok',
            data: rs
        }
    }
}
