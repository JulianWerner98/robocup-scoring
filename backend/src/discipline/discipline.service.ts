import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Discipline, DisciplineDocument} from "./discipline.schema";

@Injectable()
export class DisciplineService {
    constructor(@InjectModel(Discipline.name) private disciplineModel: Model<DisciplineDocument>) {
    }


}
