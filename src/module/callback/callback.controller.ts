import { Body, Controller, Post, Request, Response } from '@nestjs/common';

@Controller('callback')
export class CallbackController {
    @Post("pay/succ")
    __paySucc(
        @Request() req,
        @Body() postData,
        @Response() res
    ) {
        console.log(new Date())
        // console.log('req',req);
        console.log('Body', postData);


        res.set('Content-Type', 'text/xml');
        res.send(
            `<xml>
              <return_code><![CDATA[SUCCESS]]></return_code>
              <return_msg><![CDATA[OK]]></return_msg>
            </xml>`
        )
    }
}
