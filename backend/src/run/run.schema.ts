import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Schema as SchemaMongoose} from "mongoose";

@Schema({timestamps: true})
export class Run {

    @Prop()
    number: number;

    @Prop()
    points: number;

    @Prop()
    time: number;

    @Prop()
    firstReview: string;

    @Prop()
    secondReview: string;
}

export const RunSchema = SchemaFactory.createForClass(Run);

export type RunDocument = Run & Document