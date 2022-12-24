import {Body, Controller, Get, Post} from '@nestjs/common';
import {ScoreService} from "./score.service";
import {AuthenticatedUser} from "nest-keycloak-connect";
import {UpdateUserProfile} from "../admin/dto/update-userProfile.dto";
import {Score} from "./score.schema";
import {InitTeamDto} from "./dto/initTeam.dto";

@Controller({
    version: '1',
    path: 'score'
})
export class ScoreController {
    constructor(private readonly scoreService: ScoreService) {
    }

    @Post('init')
    initScore(@AuthenticatedUser() user,
              @Body() scores: InitTeamDto): Promise<Score[]> {
        return this.scoreService.initScore(scores.scores);
    }

    @Get('full')
    getFullScore(@AuthenticatedUser() user): Promise<any[]> {
        return this.scoreService.getFullScore(user);
    }

    @Get()
    getScore(@AuthenticatedUser() user): Promise<any[]> {
        return this.scoreService.getScore(user);
    }
}
