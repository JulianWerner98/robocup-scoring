import {Injectable} from '@nestjs/common';
import {Run, RunDocument} from "./run.schema";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

@Injectable()
export class RunService {
    constructor(@InjectModel(Run.name) private runModel: Model<RunDocument> ) {}


    create(runNumber: number): Promise<Run> {
        return this.runModel.create({
            number: runNumber,
            points: Math.floor(Math.random() * 1000),
            time: Math.floor(Math.random() * 480)
        });
    }
}
