import { Controller, Get, Render, Query, Param, Body, Put } from '@nestjs/common';
import { AdminUrlName } from "config/admin.config"

import { WorkerService } from "src/service/worker/worker.service"



@Controller(`${AdminUrlName}/worker`)
export class WorkerController {
    constructor(
        private workerService: WorkerService
    ) { }
    // 铲屎官列表页面
    @Get()
    @Render("admin/worker/list")
    listPage() {
        return {

        }
    }

    // 铲屎官列表接口
    @Get("worker-list-json")
    async __list(

        @Query('page') pageNum: number = 1,
        @Query('limit') pageSize: number = 10,
    ) {



        let list = await this.workerService.list({
            pageNum,
            pageSize
        })

        //   console.log(list);

        return {
            code: 0,
            msg: 'ok',
            data: list
        }
    }


    @Get("check")
    @Render("admin/worker/check")
    checkPage() {
        return {

        }
    }

    @Get("check/detail/:id")
    @Render("admin/worker/check-detail")
    async checkDetailPage(
        @Param('id') id
    ) {
        // 查询当前 认证信息

        let rs = await this.workerService.findById(id);
        // console.log(rs)
        return {
            data: rs
        }
    }

    @Put("check/changeStatus/:id")

    async changeStatus(
        @Param('id') id,
        @Body('status') status
    ) {
        if (Number(status) === 2) {
            // 审批通过

            try {
                let rs = await this.workerService.findByIdAndChangeStatus(id, status);

                return {
                    code:0,
                    msg:'ok',
                    data: rs
                }
            } catch (error) {
                return {
                    code :-1,
                    msg:error.message
                }
            }
            
        } else if (Number(status) === 1) {
            // 驳回
        }

    }




}
