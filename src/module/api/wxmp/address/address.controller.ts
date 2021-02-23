import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request } from '@nestjs/common';
import { AddressService } from '../../../../service/address/address.service';
import { UserService } from '../../../../service/user/user.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AddressDto } from './addressDto';

@Controller('api/address')
@ApiTags('地址管理')
@ApiBearerAuth()
export class AddressController {
  constructor(
    private addressService: AddressService,
    private userService: UserService,
  ) {
  }

  @Get()
  @ApiOperation({
    summary: '获取地址列表',
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
    @Request() req
  ) {
    let openid = req.tokenInfo['openid'];
    let user = await this.userService.findByOpenid(openid)
    let addressList = await this.addressService.list({
      pageNum,
      pageSize,
    },user._id);

    return {
      code: 0,
      msg: 'ok',
      data: addressList,
    };
  }






  @Post()
  @ApiOperation({
    summary: '新增地址',
  })
  async __add(@Body() AddressAddDto: AddressDto, @Request() req) {
    let openid: string = req.tokenInfo['openid'];
    let user = await this.userService.findByOpenid(openid);
    let address = await this.addressService.add(user._id, AddressAddDto);
    return {
      code: 0,
      msg: 'ok',
      data: address,
    };
  }







  @Put(':id')
  @ApiParam({
    name: 'id',
    description: '地址ID（_id）',
  })
  @ApiOperation({
    summary: '编辑地址',
  })
  async __update(
    @Param('id') id,
    @Body() AddressAddDto: AddressDto,
  ) {
    await this.addressService.edit(id, AddressAddDto);

    return {
      code: 0,
      msg: 'ok',
    };
  }







  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: '地址ID（_id）',
  })
  @ApiOperation({
    summary: '删除地址',
  })
  async __delete(
    @Param('id') id,
  ) {
    await this.addressService.delete(id);
    return {
      code: 0,
      msg: 'ok',
    };
  }





}
