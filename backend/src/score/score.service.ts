import {Injectable} from '@nestjs/common';
import {Score, ScoreDocument} from "./score.schema";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Observable} from "rxjs";

@Injectable()
export class ScoreService {
    constructor(@InjectModel(Score.name) private scoreModel: Model<ScoreDocument>) {
    }

    initScore(user: any, scores: Score[]) {
        return this.scoreModel.insertMany(scores.map(score => {
            return {
                ...score,
                createdBy: user.sub,
            }
        }));
    }
}
