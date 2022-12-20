import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Schema as SchemaMongoose} from "mongoose";

interface Run {
    readonly number: number;
    readonly points: number;
    readonly time: number;
    readonly firstReview: string;
    readonly secondReview: string;
}

@Schema()
export class Score {

    @Prop()
    teamname: string;

    @Prop()
    location: string;

    // Discipline will be a reference to the discipline collection
    @Prop({type: SchemaMongoose.Types.ObjectId})
    discipline: {type: SchemaMongoose.Types.ObjectId, Ref: 'Discipline'};

    @Prop()
    scores: Run[];
}

export const ScoreSchema = SchemaFactory.createForClass(Score);

export type ScoreDocument = Score & Document