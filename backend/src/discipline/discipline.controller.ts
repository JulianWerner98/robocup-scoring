import { Controller } from '@nestjs/common';
import {DisciplineService} from "./discipline.service";

@Controller('discipline')
export class DisciplineController {
    constructor(private readonly disciplineService: DisciplineService) {
    }
}
