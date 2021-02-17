import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class AdminService {
    constructor(@InjectModel('Admin') private __model) {}
    async find(queryJson = {}){
        return await this.__model.find(queryJson);
    }
}
