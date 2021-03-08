import { Get, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class BannerService {
    constructor(
        @InjectModel('Banner') private bannerModel,
    ) {

    }

    async add(rowJson){
        let banner = new this.bannerModel(rowJson);
        let res = await banner.save();
        return res
    }

    // 分页查询  
    async list(queryJson) {
        return this.bannerModel.paginate(
            {},
            {
                page: Number(queryJson.pageNum),
                limit: Number(queryJson.pageSize),
            },
        );
    }

}
