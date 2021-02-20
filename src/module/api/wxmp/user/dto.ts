
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class LoginDto {
    @ApiModelProperty({
      description:'微信静默登录code'
    })
    code:string
  }
export  class UserInfoDto {
    @ApiModelProperty({
      description:'用户昵称',
      required:false
    })
    nickName:string
  
    @ApiModelProperty({
      description:'用户头像',
      required:false
    })
    avatarUrl:string
    @ApiModelProperty({
      description:'用户性别 1男 2女',
      required:false
    })
    gender:number
  
    @ApiModelProperty({
      description:'省',
      required:false
    })
    province:string
   
    @ApiModelProperty({
      description:'市',
      required:false
    })
    city:string
    @ApiModelProperty({
      description:'区',
      required:false
    })
    area:string
    @ApiModelProperty({
      description:'国家',
      required:false
    })
    country:string
    @ApiModelProperty({
      description:'邮箱',
      required:false
    })
    email:string
   
  }