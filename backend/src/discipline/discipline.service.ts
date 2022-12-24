import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Discipline, DisciplineDocument} from "./discipline.schema";
import {UpdateDisciplineDto} from "./dto/update-discipline.dto";

@Injectable()
export class DisciplineService {
    constructor(@InjectModel(Discipline.name) private disciplineModel: Model<DisciplineDocument>) {
    }


    get(user: any): Promise<Discipline[]> {
        return this.disciplineModel.find({location: user.location}).exec();
    }

    create(user: any, disciplines: string[]) {
        return this.disciplineModel.insertMany(disciplines.map(discipline => {
            return {
                location: user.location,
                name: discipline,
                totalRuns: 4,
                ratedRuns:3,

            }
        }));
    }

    update(id: string, updateDisciplineDto: UpdateDisciplineDto) {
        return this.disciplineModel.findOneAndUpdate({_id: id}, updateDisciplineDto, {new: true});
    }
}
