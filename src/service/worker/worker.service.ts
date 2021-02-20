import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class WorkerService {
    constructor(
        @InjectModel("Worker") private workerModel
    ){

    }
    // 注册成为铲屎官
    async apply(uid,rowJson){
        
        // 查询是否已经申请
        let workerFindRes = await this.workerModel.findOne({uid});
        console.log(workerFindRes);
        if(workerFindRes){
            throw new Error("申请记录已存在");
        }else{
            // 不存在 申请记录
            rowJson.uid = uid;
            let worker = new this.workerModel(rowJson);
            worker.save();
            return true
        }
    

    }

    // 分页查询 铲屎官认证列表
    async list(){

    }
}
