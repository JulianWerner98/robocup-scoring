import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Schema as SchemaMongoose} from "mongoose";

interface Run {
    readonly number: number;
    readonly points: number;
    readonly time: number;
    readonly firstReview: string;
    readonly secondReview: string;
}

@Schema({timestamps: true})
export class Score {

    @Prop()
    teamname: string;

    @Prop()
    originalId: string;

    @Prop()
    location: string;

    // Discipline will be a reference to the discipline collection
    @Prop({type: SchemaMongoose.Types.ObjectId})
    discipline: {type: SchemaMongoose.Types.ObjectId, Ref: 'Discipline'};

    @Prop({type: SchemaMongoose.Types.ObjectId})
    runs:[ {type: SchemaMongoose.Types.ObjectId, Ref: 'Run'}];
}

export const ScoreSchema = SchemaFactory.createForClass(Score);

export type ScoreDocument = Score & Document