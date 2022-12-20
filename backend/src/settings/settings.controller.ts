import {Controller, Get} from '@nestjs/common';
import {SettingsService} from "./settings.service";
import {Public} from "nest-keycloak-connect";

@Controller({
    version: '1',
    path: 'settings'
})
export class SettingsController {
    constructor( private readonly settingsService: SettingsService){
    }
}
