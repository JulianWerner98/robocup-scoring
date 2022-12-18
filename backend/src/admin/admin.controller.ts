import {Body, Controller, Delete, OnModuleInit, Patch} from '@nestjs/common';
import KcAdminClient from '@keycloak/keycloak-admin-client';
import {ConfigService} from '@nestjs/config';
import {AuthenticatedUser, Roles} from 'nest-keycloak-connect';
import {UpdateUserProfile} from "./dto/update-userProfile.dto";

// https://github.com/keycloak/keycloak-nodejs-admin-client
@Controller({
    version: '1',
    path: 'admin',
})
export class AdminController implements OnModuleInit {
    kcAdminClient = new KcAdminClient({
        baseUrl: this.configService.get<string>('KEYCLOAK_URI'),
        realmName: 'master',
    });

    constructor(
        private configService: ConfigService) {
    }

    async onModuleInit() {
        const credentials: any = {
            username: this.configService.get<string>('KEYCLOAK_USER'),
            password: this.configService.get<string>('KEYCLOAK_PASSWORD'),
            grantType: 'password',
            clientId: 'admin-cli',
        };
        await this.kcAdminClient.auth(credentials);
        this.kcAdminClient.setConfig({
            realmName: 'RoboCup',
        });

        //Refresh
        setInterval(async () => {
            this.kcAdminClient.setConfig({
                realmName: 'master',
            });
            await this.kcAdminClient.auth(credentials);
            this.kcAdminClient.setConfig({
                realmName: 'RoboCup',
            });
        }, 58 * 1000); // 58 sec
    }



    @Patch('user')
    @Roles({roles: ['realm:default-roles-robocup']})
    async updateUserProfile(
        @AuthenticatedUser() user: any,
        @Body() updateUserProfile: UpdateUserProfile) {
        await this.kcAdminClient.users.update({id: user.sub}, updateUserProfile);
    }

    @Delete()
    @Roles({roles: ['realm:default']})
    async deleteEverything(@AuthenticatedUser() user: any,) {
        await this.kcAdminClient.users.del({id: user.sub});
    }
}
