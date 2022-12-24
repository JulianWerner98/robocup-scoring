import {Injectable} from '@nestjs/common';
import {Score, ScoreDocument} from "./score.schema";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {ObjectId} from "mongodb";

@Injectable()
export class ScoreService {
    constructor(@InjectModel(Score.name) private scoreModel: Model<ScoreDocument>) {
    }

    initScore(scores: Score[]) {
        return this.scoreModel.insertMany(scores.map(score => {
            return {
                ...score,
            }
        }));
    }

    getFullScore(user) {
        return this.scoreModel.aggregate([
            {
                $match: {
                    location: user.location,
                }
            },
            {
                //connect with runs
                $lookup: {
                    from: 'runs',
                    localField: 'runs',
                    foreignField: '_id',
                    as: 'runs',
                },
            },
            ]).exec();
    }

    getScore(user) {
        return this.scoreModel.aggregate([
            {
                $match: {
                    location: user.location,
                }
            },
        ]).exec();
    }

    addRun(id: string, runId: ObjectId) {
        return this.scoreModel.findByIdAndUpdate(id, {
            $push: {
                runs: runId
            }
        }, {new: true});
    }
}
