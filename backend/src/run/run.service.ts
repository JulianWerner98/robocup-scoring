import {Injectable} from '@nestjs/common';
import {Run, RunDocument} from "./run.schema";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

@Injectable()
export class RunService {
    constructor(@InjectModel(Run.name) private runModel: Model<RunDocument> ) {}


    create(run: Run): Promise<Run> {
        return this.runModel.create(run);
    }

    getOne(id: string) {
        return this.runModel.findOne({_id: id}).exec();
    }

    update(id: string, run: Run) {
        return this.runModel.findOneAndUpdate({_id: id}, run, {new: true}).exec();
    }
}
