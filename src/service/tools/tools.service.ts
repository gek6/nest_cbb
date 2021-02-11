import { Injectable } from '@nestjs/common';
import * as captcha from "node-svgcaptcha";
import * as md5 from "md5";
@Injectable()
export class ToolsService {

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


    MD5(str:string = ''){
        if(str.length){
            return md5(str)
        }else{
            throw new Error('加密字符串为空')
        }
    }
}
