import { Injectable } from '@nestjs/common';
const captcha = require("node-svgcaptcha");

const md5 = require("md5") ;
@Injectable()
export class ToolsService {
    

    // 生成图片验证码
    createCodeImg(){
       
        var genCaptcha = captcha({
            length: 4 ,// lenght of chars in generated captcha
            width: 100 ,// width of the generated image
            height: 40 ,// height of the generated image
            color: true ,// true means that letters are painted in colors and false in gray scale
            lines: 2 ,// number of lines in the captcha
            noise: 0// level of noise (points) in the captcha
        });
    
        return genCaptcha
    }

    // MD5加密
    MD5(str:string = ''){
        if(str.length){
            return md5(str)
        }else{
            throw new Error('加密字符串为空')
        }
    }

   
}
