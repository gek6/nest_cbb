
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';


export class PetDto {
  @ApiModelProperty({
    description:'宠物名称',
    example:'贝贝'
  })
  name:string;

  @ApiModelProperty({
    description:'性别 1男 2女',
    example:1
  })
  gender:number;

  @ApiModelProperty({
    description:'是否绝育 1是 2否',
    example:1
  })
  jueyu:number;

  @ApiModelProperty({
    description:'是否需要额外玩耍 1是 2否',
    example:1
  })
  play:number;

  @ApiModelProperty({
    description:'是否亲近陌生人 1是 2否',
    example:1
  })
  friendly:number;

  @ApiModelProperty({
    description:'打疫苗记录 jsonString',
    example:'{"a":"1","b":"2"}'
  })
  yimiao:string;

  @ApiModelProperty({
    description:'驱虫记录 jsonString',
    example:'{"a":"1","b":"2"}'
  })
  quchong:string;

  @ApiModelProperty({
    description:'宠物病史 jsonString',
    example:'{"a":"1","b":"2"}'
  })
  bingshi:string;

  @ApiModelProperty({
    description:'猫粮或猫砂的摆放位置 照片',
    example:'/xx/xx/xx.jpg'
  })
  food_position_img:string;

  @ApiModelProperty({
    description:'宠物头像',
    example:'/xx/xx/xx.jpg'
  })
  pet_img:string;

  @ApiModelProperty({
    description:'体重',
    example:'3KG-5KG'
  })
  weight:string;


}
