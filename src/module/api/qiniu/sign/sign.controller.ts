import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import * as qiniu from "qiniu";
import { AK, SK } from "config/qiniu.config"
@Controller('api/qiniu')
@ApiTags('图片上传')

export class SignController {
    @Get("sign")
    @ApiOperation({
        summary: "七牛云上传签名",
        description: '七牛云上传签名'
    })
    __sign() {
        var mac = new qiniu.auth.digest.Mac(AK, SK);
        var options = {
            scope: 'chanbaba',
        };
        var putPolicy = new qiniu.rs.PutPolicy(options);
        var uploadToken = putPolicy.uploadToken(mac);
        return {
            code: 0,
            msg: 'ok',
            data: uploadToken
        }
    }
}
