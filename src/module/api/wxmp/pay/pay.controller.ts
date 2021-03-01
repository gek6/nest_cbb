import { Controller, Get, Param, Post, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
const Tenpay = require('tenpay');
import { APPID, MCHID, WXPAYAPIKEY, BACKURL } from "config/weixin.config"
import * as path from "path"

import { RechargeService } from "src/service/recharge/recharge.service"

@Controller('api/pay')
@ApiTags('小程序-支付')
@ApiBearerAuth()
export class PayController {
    constructor(
        private readonly rechargeService: RechargeService
    ) { }
    /**
     * 获取 指定订单 支付签名
     * @param req 
     */
    @Get("order/:orderid")
    @ApiOperation({
        summary: " 获取 指定订单 支付签名"
    })
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


    /**
     * 获取指定充值金额的 支付签名
     * @param req 
     * @param money 
     */
    @Get("recharge/:money")
    @ApiOperation({
        summary: "获取指定充值金额的 支付签名"
    })
    @ApiParam({
        name: 'money',
        description: '金额 单位：分',
        example: '1'
    })
    async __recharge(
        @Request() req ,
        @Param('money') money
    ) {

        let openid = req.tokenInfo['openid']
        // 生成 充值 记录
        let recharge = await this.rechargeService.createRechargeLog(openid, money, 1);
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
            out_trade_no: recharge.num,
            body: '铲粑粑上门服务平台',
            total_fee: money,
            openid: openid
        });

        return {
            code: 0,
            msg: 'ok',
            data: result
        }
    }

    /**
     * 获取我的钱包相关信息
     * 
     */
    @ApiOperation({
        summary: "获取我的钱包相关信息"
    })
    @Get("wallet")
    async __wallet(
        @Request() req
    ) {
        let openid = req.tokenInfo['openid'];
        let data = await this.rechargeService.findRechargeListAndSearchMoneu(openid)
        return {
            code: 0,
            msg: 'ok',
            data
        }
    }

    /**
     * 提现
     */
    @ApiOperation({
        summary: "提现到微信零钱"
    })
    @Get("take/:money")
    @ApiParam({
        name: 'money',
        description: '金额 单位：分',
        example: '1'
    })
    async __take(
        @Request() req ,
        @Param('money') money
    ) {
        console.log("take")
        let certPath = path.join(__dirname,"../../../../../../config/cert/apiclient_cert.p12")
     
        let openid = req.tokenInfo['openid']
        // 生成 充值 记录
        let recharge = await this.rechargeService.createRechargeLog(openid, money, 2);

        const config = {
            appid: APPID,
            mchid: MCHID,
            partnerKey: WXPAYAPIKEY,
            // TODO 必填证书
            pfx: require('fs').readFileSync(certPath),
            notify_url: BACKURL,
            // spbill_create_ip: 'IP地址'
        };
        // 方式一
        const api = new Tenpay(config);
        let result = await api.transfers({
            partner_trade_no: recharge.num,
            openid,
            re_user_name: '袁江',
            amount: '1',
            desc: '企业付款描述信息'
        });
        return {
            data:result
        }
    }
}
