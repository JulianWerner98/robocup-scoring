import {Body, Controller, Get, Post} from '@nestjs/common';
import {ScoreService} from "./score.service";
import {AuthenticatedUser} from "nest-keycloak-connect";
import {Score} from "./score.schema";
import {InitTeamDto} from "./dto/initTeam.dto";
const fs = require('fs');

const puppeteer = require('puppeteer');

@Controller({
    version: '1',
    path: 'score'
})
export class ScoreController {
    constructor(private readonly scoreService: ScoreService) {
        this.testFunction().then(() => {
            console.log('testFunction finished');
        });
    }

    async testFunction() {
        console.log('testFunction');
        // Create a browser instance
        const browser = await puppeteer.launch();

        // Create a new page
        const page = await browser.newPage();

        // Website URL to export as pdf
        const website_url = 'https://www.bannerbear.com/blog/how-to-download-images-from-a-website-using-puppeteer/';

        await page.setContent('<label _ngcontent-jmo-c195="">Teamname</label><input _ngcontent-jmo-c195="" type="text" class="s40" data-com.bitwarden.browser.user-edited="yes"><label _ngcontent-jmo-c195="">Runde</label><input _ngcontent-jmo-c195="" type="number" min="1" class="s7"><label _ngcontent-jmo-c195="">Arena</label><input _ngcontent-jmo-c195="" type="number" min="1" class="s7">');

        await page.emulateMediaType('screen');

        const pdf = await page.pdf({
            path: 'result.pdf',
            margin: {top: '100px', right: '50px', bottom: '100px', left: '50px'},
            printBackground: true,
            format: 'A4',
        });

        // Save the pdf to a file
        fs.writeFile('result.pdf', pdf, (err) => {
            if (err) {
                return console.log(err);
            }
            console.log('The file was saved!');
        });

        await browser.close();
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
