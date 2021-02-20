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
    private petService:PetService
  ) {
  }
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
      code: 1,
      msg: 'ok',
      data: list,
    };
  }

  @Post()
  @ApiOperation({
    summary: '新增宠物',
  })
  async __add(@Body() postData:PetDto, @Request() req) {
    let openid: string = req.tokenInfo['openid'];
    let user = await this.userService.findByOpenid(openid);
    let address = await this.petService.add(user._id, postData);
    return {
      code: 1,
      msg: 'ok',
      data: address,
    };
  }

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
    @Body() postData:PetDto,
  ) {
    await this.petService.edit(id, postData);

    return {
      code: 1,
      msg: 'ok',
    };
  }

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
      code: 1,
      msg: 'ok',
    };
  }
}
