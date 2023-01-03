import {Body, Controller, Get, Param, Patch, Post} from '@nestjs/common';
import {RunService} from "./run.service";
import {NotFound} from "../util/not-found.decorator";
import {Run} from "./run.schema";
import {FindRunDto} from "./dto/find-run.dto";
import {CreateRunDto} from "./dto/create-run.dto";
import {ScoreService} from "../score/score.service";

@Controller({
    version: '1',
    path: 'run'
})
export class RunController {
    constructor(private readonly runService: RunService,
                private readonly scoreService: ScoreService) {}

    @Post(':id')
    @NotFound()
    async createRun(@Param() params: FindRunDto,
                    @Body() createRunDto: CreateRunDto): Promise<Run> {
        let run = await this.runService.create(createRunDto.run);
        await this.scoreService.addRun(params.id, (run as any)._id);
        return run;
    }

    @Get(':id')
    @NotFound()
    getRun(@Param() params: FindRunDto): Promise<Run> {
        console.log(params);
        return this.runService.getOne(params.id);
    }

    @Patch(':id')
    @NotFound()
    updateRun(@Param() params: FindRunDto,
                @Body() createRunDto: CreateRunDto): Promise<Run> {
        return this.runService.update(params.id, createRunDto.run);
    }
}
