import * as mongoose from 'mongoose';
import * as mongoosePaginate from "mongoose-paginate"

let workerSchema = new mongoose.Schema({
    'service_distance': String,// 服务距离
    'service_date_type': String, // 服务日期类型
    'service_status': String, // 服务状态
    'service_time_range': String, // 服务日期范围
    'ext_service': String,// 额外服务
    'name': String,//真实姓名
    'gender': Number,//性别 1男 2女
    'telephone': String,//手机号
    'wx_number': String,//微信号
    'province': String,// 省
    'city': String,//  市
    'district': String,// 区
    'address_detail': String,// 详细地址
    'company_job': String,// 企业工作
    'lng': String, // 经度
    'lat': String, // 纬度
    'birthday': String, // 生日
    'reject_message': String, // 驳回信息 
    'extend_info': String,//扩展信息
    // 认证状态 0 待审批 1 驳回 2 通过
    'status':{
        type:Number,
        default:0
    },
    // 用户ID
    'uid': mongoose.Schema.Types.ObjectId,
    // 创建时间 毫秒时间戳
    'create_time': {
        type: Date,
        default: Date.now,
    },
})


workerSchema.plugin(mongoosePaginate);
export const WorkerSchema = workerSchema