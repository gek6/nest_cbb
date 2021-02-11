import { Controller, Get, Render, Response,Request } from '@nestjs/common';
import { ToolsService } from "../../../service/tools/tools.service"
import { AdminService } from "../../../service/admin/admin.service"


@Controller('account')
export class AccountController {

    constructor(private ToolsService: ToolsService,private adminService:AdminService) { }
    @Get()
    @Render("admin/account/list")
    async listPage() {
      
        
           
        return {
             
        }
    }
    // 查询 帐号列表
    @Get("list-json")
    async listJson(){
        let list = await this.adminService.find();
        return {
            code:0,
            count:100,
            data:list
        }
    }

    @Get("add")
    @Render("admin/account/add")
    addPage() {
        return {}
    }


    @Get("getCode")
    // 获取图片验证码
    getCode(@Request() req, @Response() res) {
        let captcha = this.ToolsService.createCodeImg()
        res.set('Content-Type', 'image/svg+xml');
        console.log('生成图片验证码-> ' , captcha.captchaValue);
        req.session['imgCode'] = captcha.captchaValue;
        res.send(captcha.svg);
    }
}
