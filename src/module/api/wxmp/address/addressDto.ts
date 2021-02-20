
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';


export class AddressDto {
  @ApiModelProperty({
    description:'联系人',
    example:'王大锤'
  })
  name:string;

  @ApiModelProperty({
    description:'联系电话',
    example:'13112345678'
  })
  phone:string

  @ApiModelProperty({
    description:'经度',
    example:'108.12345'
  })
  lng:number

  @ApiModelProperty({
    description:'纬度',
    example:'34.12345'
  })
  lat:number

  @ApiModelProperty({
    description:'省份',
    example:'陕西省'
  })
  province:string

  @ApiModelProperty({
    description:'市',
    example:'西安市'
  })
  city:string

  @ApiModelProperty({
    description:'区/县',
    example:'长安区'
  })
  district:string

  @ApiModelProperty({
    description:'详细地址',
    example:'XX路XX号'
  })
  address_detail:string

}
