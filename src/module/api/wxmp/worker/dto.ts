
import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export class WorkerApplyDto {
    @ApiModelProperty({
        description: '真实姓名',
        example: '王大锤'
    })
    name: string;
    @ApiModelProperty({
        description: '手机号码',
        example: '13149278289'
    })
    'telephone': string;//手机号
    @ApiModelProperty({
        description: '微信号',
        example: 'abcdefg'
    })
    'wx_number': string;//微信号
    @ApiModelProperty({
        description: '省',
        example: '陕西省'
    })
    'province': string;// 省
    @ApiModelProperty({
        description: '市',
        example: '西安市'
    })
    'city': string;//  市
    @ApiModelProperty({
        description: '区',
        example: '雁塔区'
    })
    'district': string;// 区
    @ApiModelProperty({
        description: '详细地址',
        example: 'XX路XX号'
    })
    'address_detail': string;// 详细地址
    @ApiModelProperty({
        description: '经度',
        example: 108.12345
    })
    'lng': number; // 经度
    @ApiModelProperty({
        description: '纬度',
        example: 34.12345
    })
    'lat': number; // 纬度
    @ApiModelProperty({
        description: '扩展信息,身份证照片，是否养猫等等信息 json字符串',
        example: `{"idcard":"xxx/xxx/xxx.jpg","aaa":"111"}`
    })
    'extend_info': string;//扩展信息

}

export class WorkerServiceSettingDto {
    @ApiModelProperty({
        description: '服务距离 单位米',
        example: 20000
    })
    service_distance: number

    @ApiModelProperty({
        description: '服务日期类型',
        example:
            `{"春节":"9000","周内":"6000","五一":"7000","十一":"7000","周末":"6000",}`
    })
    service_date_type: String

    @ApiModelProperty({
        description: "服务状态 0关闭 1开启",
        example: 1
    })
    service_status: number

    @ApiModelProperty({
        description: "服务日期范围 单位 天",
        example: 90
    })
    service_time_range: number

}
