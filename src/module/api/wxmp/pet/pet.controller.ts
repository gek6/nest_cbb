import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UserService } from '../../../../service/user/user.service';
import { PetService } from '../../../../service/pet/pet.service';
import { PetDto } from "./petDto"
@Controller('api/pet')
@ApiTags('宠物管理')
@ApiBearerAuth()
export class PetController {
  constructor(
    private userService: UserService,
    private petService: PetService
  ) {
  }

  /**
   * 分页查询 宠物列表
   * @param pageNum 
   * @param pageSize 
   */
  @Get()
  @ApiOperation({
    summary: '获取宠物列表',
  })
  @ApiQuery({
    name: 'pageNum',
    type: Number,
    example: '1',
    description: '当前页码',
  })
  @ApiQuery({
    name: 'pageSize',
    type: Number,
    example: '10',
    description: '每页条数',
  })
  async __list(
    @Query('pageNum') pageNum: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    let list = await this.petService.list({
      pageNum,
      pageSize,
    });

    return {
      code: 0,
      msg: 'ok',
      data: list,
    };
  }


  /**
   * 新增宠物
   * @param postData 
   * @param req 
   */
  @Post()
  @ApiOperation({
    summary: '新增宠物',
  })
  async __add(@Body() postData: PetDto, @Request() req) {
    let openid: string = req.tokenInfo['openid'];
    let user = await this.userService.findByOpenid(openid);
    let address = await this.petService.add(user._id, postData);
    return {
      code: 0,
      msg: 'ok',
      data: address,
    };
  }

  /**
   * 修改编辑宠物
   * @param id 
   * @param postData 
   */
  @Put(':id')
  @ApiOperation({
    summary: '编辑宠物',
  })
  @ApiParam({
    name: 'id',
    description: '宠物ID（_id）',
  })
  async __update(
    @Param('id') id,
    @Body() postData: PetDto,
  ) {
    await this.petService.edit(id, postData);

    return {
      code: 0,
      msg: 'ok',
    };
  }

  /**
   * 删除宠物
   * @param id 
   */
  @Delete(':id')
  @ApiOperation({
    summary: '删除宠物',
  })
  @ApiParam({
    name: 'id',
    description: '宠物ID（_id）',
  })
  async __delete(
    @Param('id') id,
  ) {
    await this.petService.delete(id);
    return {
      code: 0,
      msg: 'ok',
    };
  }

  @ApiOperation({
    summary: '获取新增宠物的表单选项',
  })
  @Get("options")
  __petOptions() {
    return {
      code: 0,
      msg: 'ok',
      data: {
        'weight': [
          '≤2.5kg',
          '2.5-5kg',
          '5-7.5kg',
          '7.5-10kg',
          '≥10kg'

        ],
        'yimiao': [
          // '猫三联 FVRCP Distemper Shot',
          // '狂犬 Rabies',
          // '未注射过疫苗 None'

          '猫三联',
          '狂犬',
          '未注射过疫苗'
        ],
        'quchong': [
          // '按月驱虫 Monthly',
          // '按季驱虫 Quarterly',
          // '按年驱虫 Yearly',
          // '无规律的 Irregularly',
          // '尚未驱虫 Not yet'

          '按月驱虫',
          '按季驱虫',
          '按年驱虫',
          '无规律的',
          '尚未驱虫'
        ],
        'bingshi': [
          // '无 No',
          // '猫杯状杯病 Calicivirus (FHV)',
          // '猫疱疹病毒（鼻支气管炎） Viral Rhinotracheitis (FCV)',
          // '泛白细胞减少症（猫瘟，猫细小） Panleukopenia (FPV)',
          // '肾功能疾病 Renal Disease',
          // '猫传染性腹膜炎 Feline infectious peritonitis (FIP)',
          // '心脏病 Heart Disease',
          // '糖尿病 Diabetes',
          // '艾滋病 Feline Aids',
          // '骨骼疾病 Bone Disorders'

          '无',
          '猫杯状杯病',
          '猫疱疹病毒（鼻支气管炎）',
          '泛白细胞减少症（猫瘟，猫细小）',
          '肾功能疾病',
          '猫传染性腹膜炎',
          '心脏病',
          '糖尿病',
          '艾滋病',
          '骨骼疾病'
        ],
        'friendly': [
          // '是 Yes',
          // '否 No',
          // '熟悉后亲人 Familiarized First'
          '是',
          '否',
          '熟悉后亲人'
        ],
        'pinzhong': [
          // '中华田园猫（狸花猫、橘猫） Chinese Rural Cat',
          // '美国短毛猫（美短） American Shorthair',
          // '英国短毛猫（英短） British Shorthair',
          // '布偶猫 Ragdoll',
          // '苏格兰折耳猫 Scottish Fold',
          // '波斯猫 Persian',
          // '加菲猫 Garfield',
          // '暹罗猫 Siamese',
          // '缅因猫 Maine Coon'

          '中华田园猫（狸花猫、橘猫）',
          '美国短毛猫（美短）',
          '英国短毛猫（英短）',
          '布偶猫',
          '苏格兰折耳猫',
          '波斯猫',
          '加菲猫',
          '暹罗猫',
          '缅因猫'
        ]
      }

    }
  }
  
}
