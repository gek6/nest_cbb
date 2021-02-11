import { Body, Controller, Get, Post, Render,Request } from '@nestjs/common';
import { userInfo } from 'os';
import { AdminService } from "../../../service/admin/admin.service"
import { ToolsService } from "../../../service/tools/tools.service"
@Controller('login')
export class LoginController {
    constructor( private adminService:AdminService,private toolsService:ToolsService ){

    }
    @Get()
    @Render('admin/login')
    loginPage(){

        return {

        }
    }

    @Post()
    async __login(@Body() Body,@Request() req){
        console.log(Body);
        // console.log('缓存中 imgCode ->' ,req.session['imgCode'] )
        // 验证码
      
        let username:string = Body.username;
        let password:string = this.toolsService.MD5(Body.password);
        let code:string = Body.code;
        
 
        if(!username){
            return {
                code:401000,
                msg:'缺少参数 username'
            }
        }
        if(!password){
            return {
                code:401000,
                msg:'缺少参数 password'
            }
        }
        if(!code){
            return {
                code:401000,
                msg:'缺少参数 code'
            }
        }

        if(code.toLocaleLowerCase() !== req.session['imgCode'].toLocaleLowerCase()){

            return {
                code:401002,
                msg:'验证码错误'
            }
        }

        let findRes = await this.adminService.find({
            username,
            password
        })

       
        if(findRes.length){
            req.session['userInfo'] = findRes[0]
            return {
                code:0,
                msg:'登陆成功'
            }
        }else{
            return {
                code:401001,
                msg:'帐号或密码错误'
            }
        }

        
    }
}
