import { Controller, Get, Param, Post, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
const Tenpay = require('tenpay');
import { APPID, MCHID, WXPAYAPIKEY, BACKURL } from "config/weixin.config"
@Controller('api/pay')
@ApiTags('小程序-支付')
@ApiBearerAuth()
export class PayController {
    @Get("order/:orderid")
    @ApiParam({
        name: 'orderid',
        description: '订单号',
        example: '123456'
    })
    async __paySign(@Request() req) {
        let openid = req.tokenInfo['openid']
        const config = {
            appid: APPID,
            mchid: MCHID,
            partnerKey: WXPAYAPIKEY,
            // pfx: require('fs').readFileSync('证书文件路径'),
            notify_url: BACKURL,
            // spbill_create_ip: 'IP地址'
        };
        // 方式一
        const api = new Tenpay(config);
        let pre_order = await api.unifiedOrder({
            out_trade_no: new Date().getTime(),
            body: '商品简单描述',
            total_fee: '1',
            openid: openid
        });
        let result = await api.getPayParamsByPrepay({
            prepay_id: pre_order
        });
        // 方式二
        // const api = tenpay.init(config);

        // 调试模式(传入第二个参数为true, 可在控制台输出数据)
        // const api = new tenpay(config, true);

        // 沙盒模式(用于微信支付验收)
        // const sandboxAPI = await tenpay.sandbox(config);
        return {
            code: 0,
            msg: 'ok',
            data: result
        }
    }
    @Get("recharge/:money")
    @ApiParam({
        name: 'money',
        description: '金额 单位：分',
        example: '1'
    })
    async __recharge(@Request() req, @Param('money') money) {
        // console.log(money)
        // TODO 生成 充值 记录
        
        let openid = req.tokenInfo['openid']
        const config = {
            appid: APPID,
            mchid: MCHID,
            partnerKey: WXPAYAPIKEY,
            // pfx: require('fs').readFileSync('证书文件路径'),
            notify_url: BACKURL,
            // spbill_create_ip: 'IP地址'
        };
        // 方式一
        const api = new Tenpay(config);
        let result = await api.getPayParams({
            out_trade_no: new Date().getTime(),
            body: '商品简单描述',
            total_fee: money,
            openid: openid
        });
        
        // TODO 回调中 修改 充值 是否成功状态
        return {
            code: 0,
            msg: 'ok',
            data: result
        }
    }

    
}
