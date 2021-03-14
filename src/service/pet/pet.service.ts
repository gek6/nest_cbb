import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PetService {

  constructor(
    @InjectModel('Address') private addressModel,
    @InjectModel('Pet') private petModel,
  ) {

  }

  async add(uid, rowJson) {
    rowJson.uid = uid;
    let address = new this.petModel(rowJson);
    let handleRes = await address.save();
    console.log(handleRes);
    return handleRes;
  }

  async delete(id) {
    return this.petModel.findByIdAndDelete(id);
  }

  async edit(id, AddressAddDto) {
    return this.petModel.findByIdAndUpdate(id, AddressAddDto);
  }

  // 分页查询 列表
  async list(queryJson) {

    return this.petModel.paginate(
      { uid: queryJson.uid },
      {
        page: Number(queryJson.pageNum),
        limit: Number(queryJson.pageSize),
      },
    );
  }
  // 分页查询 列表
  async adminList(queryJson) {

    return this.petModel.paginate(
        {},
        {
          page: Number(queryJson.pageNum),
          limit: Number(queryJson.pageSize),
        },
    );
  }
}
