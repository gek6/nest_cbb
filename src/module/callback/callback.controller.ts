import { Body, Controller, Post, Request, Response } from '@nestjs/common';
import { CallbackService } from "../../service/callback/callback.service"
@Controller('callback')
export class CallbackController {
constructor(
    private callbackService : CallbackService
){}

    @Post("pay/succ")
    __paySucc(
        @Request() req,
        @Body() postData,
        @Response() res
    ) {
        console.log(new Date())
        // console.log('req',req);
        // console.log('Body', postData);
        let nums = postData['xml']['out_trade_no']
        let num = nums[0];
        console.log(num)
        this.callbackService.__paySuccAndUpdateRechargeLogAndUpdateUserMoney(num)
        res.set('Content-Type', 'text/xml');
        res.send(
`<xml>
  <return_code><![CDATA[SUCCESS]]></return_code>
  <return_msg><![CDATA[OK]]></return_msg>
</xml>`
        )
    }
}
