import { Body, Controller, Get, Post,Request } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/service/user/user.service';
import { WorkerService } from 'src/service/worker/worker.service';
import { WorkerApplyDto } from "./dto"


@Controller('api/worker')
@ApiTags('铲屎官')
@ApiBearerAuth()
export class WorkerController {
    constructor(
        private readonly workerService : WorkerService,
        private readonly userService : UserService
    ){}
    @Get()
    @ApiOperation({
        summary:`获取铲屎官信息`
    })
    __info() {
        return {
            code:1,
            msg:'ok'
        }
    }

    @Post()
    @ApiOperation({
        summary:`铲屎官入驻`
    })
    async __apply(@Body() postData:WorkerApplyDto,@Request() req){
        let openid: string = req.tokenInfo['openid'];
        let user = await this.userService.findByOpenid(openid);
        try {
            await this.workerService.apply(user._id,postData);
            return {
                code:1,
                msg:'ok'
            }
        } catch (error) {
            return{
                code:0,
                msg:error.message
            }
        }
        
    }
}
