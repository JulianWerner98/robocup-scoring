import {Body, Controller, Get, Param, Patch, Post} from '@nestjs/common';
import {DisciplineService} from "./discipline.service";
import {NotFound} from "../util/not-found.decorator";
import {AuthenticatedUser} from "nest-keycloak-connect";
import {Discipline} from "./discipline.schema";
import {CreateDiscipline} from "./dto/create-discipline.dto";
import {FindDisciplineDto} from "./dto/find-discipline.dto";
import {UpdateDisciplineDto} from "./dto/update-discipline.dto";

@Controller({
    version: '1',
    path: 'discipline'
})
export class DisciplineController {
    constructor(private readonly disciplineService: DisciplineService) {
    }

    @Get()
    @NotFound()
    async get(@AuthenticatedUser() user): Promise<any> {
        return this.disciplineService.get(user);
    }

    @Post()
    async create(
        @AuthenticatedUser() user,
        @Body() disciplines: CreateDiscipline): Promise<Discipline[]> {
        console.log(disciplines.disciplines);
        return this.disciplineService.create(user, disciplines.disciplines);
    }

    @Patch(':id')
    @NotFound()
    async update(
        @AuthenticatedUser() user,
        @Body() discipline: UpdateDisciplineDto,
        @Param() params: FindDisciplineDto): Promise<Discipline> {
        return this.disciplineService.update(params.id, discipline);
    }
}
