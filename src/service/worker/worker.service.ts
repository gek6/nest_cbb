import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { KEY } from "config/lbs.config"
import axios from "axios"
import * as qs from "qs"
@Injectable()
export class WorkerService {
    constructor(
        @InjectModel("Worker") private workerModel
    ) {

    }
    // 注册成为铲屎官
    async apply(uid, rowJson) {

        // 查询是否已经申请
        let workerFindRes = await this.workerModel.findOne({ uid });
        console.log(workerFindRes);
        if (workerFindRes) {
            throw new Error("申请记录已存在");
        } else {
            // 不存在 申请记录
            rowJson.uid = uid;
            let worker = new this.workerModel(rowJson);
            worker.save();
            return true
        }


    }

    async saveSetting(uid,settingJson){
        return this.workerModel.findOneAndUpdate({uid},settingJson)
    }

    // 分页查询 铲屎官认证列表
    async list(queryJson) {
        return this.workerModel.paginate(
            {},
            {
                page: Number(queryJson.pageNum),
                limit: Number(queryJson.pageSize),
            },
        );
    }


    async findById(id: string) {
        return this.workerModel.findById(id)
    }


    /**
     * 将铲屎官的坐标信息更新至 LBS 中
     * 再修改 审核状态为 通过（2）
     * @param id 
     * @param status 
     */
    async findByIdAndChangeStatus(id, status) {
       let worker =  await this.workerModel.findById(id);

       let postRes = await axios.post("https://apis.map.qq.com/place_cloud/data/create",{
        data:[{
            ud_id:worker._id,//自定义ID（user defined id)
            title:worker.address_detail,//地点名称
            location:{
                lat:parseFloat(worker.lat),
                lng:parseFloat(worker.lng)
            }
        }],
        table_id:"5ff81d1712abba400957df8f",
        key:KEY
       },{
           headers:{
            "content-type":"application/json"
           }
       })
       if(postRes.data.status==0){
        return this.workerModel.findByIdAndUpdate(id, {
            status
        })
       }else{
           throw new Error("LBS 记录失败");
           
       }
     

        
        
    }

    /**
     * 匹配范围内的铲屎官
     */
    async matchingWorker(queryJson){
        console.log("matchingWorker")
       
 
        let lng_scale = 0.054390; // 经度   0.05439/5公里
        let lat_scale = 0.044965; // 纬度   0.044965/5公里
        
        // dump($query);
        // TODO 匹配 用户经纬度 20公里范围内的 铲屎官
        let lng = Number(queryJson['lng']);
        let lat = Number(queryJson['lat']);
        let top = lat + lat_scale * 2;
        let bottom = lat - lat_scale * 2;
        let left = lng - lng_scale * 2;
        let right = lng + lng_scale * 2;
        let queryStr = {
            'rectangle' : bottom + ',' + left + ';' + top + ',' + right,
            'table_id' : '5ff81d1712abba400957df8f',
            'key' : KEY,
            'orderby' : `distance(${lat},${lng})`
        }
        // console.log(queryStr)
        let searchRes = await axios.get("https://apis.map.qq.com/place_cloud/search/rectangle?"+qs.stringify(queryStr))
        
        // console.log(searchRes.data)
        let workerLbsList = searchRes.data.result.data;
        // console.log(workerLbsList)
    
        let canUseWorkerList = [];
        for (let index = 0; index < workerLbsList.length; index++) {
            const element = workerLbsList[index];
            let worker = await this.workerModel.findById(element.ud_id);
            // 判断是否 在接单状态
            // console.log("判断是否 在接单状态")
            if(worker.service_status!=1){
                // console.log("未通过")
                return
            }
            // console.log("通过")
            // 判断距离是否在 铲屎官接单范围内
            // console.log("判断距离是否在 铲屎官接单范围内")
            if(element._distance>worker.service_distance){
                // console.log("未通过")

                return
            }
            // console.log("通过")
            canUseWorkerList.push(worker);
        }
        console.log(canUseWorkerList)
        return canUseWorkerList
    }
}
