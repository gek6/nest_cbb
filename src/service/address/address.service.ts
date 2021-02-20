import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel('Address') private addressModel,
  ) {

  }

  async add(uid, rowJson) {
    rowJson.uid = uid;
    let address = new this.addressModel(rowJson);
    let handleRes = await address.save();
    console.log(handleRes);
    return handleRes;
  }

  async delete(id) {
    return this.addressModel.findByIdAndDelete(id);
  }

  async edit(id, AddressAddDto) {
    return this.addressModel.findByIdAndUpdate(id, AddressAddDto);
  }

  // 分页查询 列表
  async list(queryJson) {

    return this.addressModel.paginate(
      {},
      {
        page: Number(queryJson.pageNum),
        limit: Number(queryJson.pageSize),
      },
    );
  }
}
