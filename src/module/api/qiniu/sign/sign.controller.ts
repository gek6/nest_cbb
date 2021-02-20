import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('api/qiniu/sign')
@ApiTags('图片上传')

export class SignController {
    @Get()
    @ApiOperation({
        summary:"七牛云上传签名",
        description:'七牛云上传签名'
    })
    __sign(){
        return {
            code:1,
            msg:'七牛上传签名 未完成'
        }
    }
}
