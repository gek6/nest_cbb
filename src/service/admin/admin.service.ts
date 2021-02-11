import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class AdminService {
    constructor(@InjectModel('Admin') private adminModel) {}
    async find(queryJson = {}){
        return await this.adminModel.find(queryJson);
    }
}
