import { Injectable } from '@nestjs/common';
import { SecretId, SecretKey } from "config/msg.config"
// Depends on tencentcloud-sdk-nodejs version 4.0.3 or higher
const tencentcloud = require("tencentcloud-sdk-nodejs");

const SmsClient = tencentcloud.sms.v20190711.Client;

@Injectable()
export class PhoneMsgService {
 
    async sendVerifyCodeMsg(phoneNum,code){
        const clientConfig = {
            credential: {
                secretId: SecretId,
                secretKey: SecretKey,
            },
            region: "",
            profile: {
                httpProfile: {
                    endpoint: "sms.tencentcloudapi.com",
                },
            },
        };

        const client = new SmsClient(clientConfig);
        const params = {
            "PhoneNumberSet": [
                "+86"+phoneNum
            ],
            "TemplateParamSet": [
                code,
                "5"
            ],
            "TemplateID": "873066",
            "SmsSdkAppid": "1400487387",
            "Sign": "上海满眸网络科技有限公司"
        };
        return client.SendSms(params)
    }

    async send(phoneNum) {
        
        const clientConfig = {
            credential: {
                secretId: SecretId,
                secretKey: SecretKey,
            },
            region: "",
            profile: {
                httpProfile: {
                    endpoint: "sms.tencentcloudapi.com",
                },
            },
        };

        const client = new SmsClient(clientConfig);
        const params = {
            "PhoneNumberSet": [
                "+8617600205514"
            ],
            "TemplateParamSet": [
                "123456",
                "2"
            ],
            "TemplateID": "873066",
            "SmsSdkAppid": "1400487387",
            "Sign": "上海满眸网络科技有限公司"
        };
        client.SendSms(params).then(
            (data) => {
                console.log(data);
            },
            (err) => {
                console.error("error", err);
            }
        );
        
       
    }
}
