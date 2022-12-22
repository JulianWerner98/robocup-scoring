import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

@Schema( { timestamps: true })
export class Discipline {

    @Prop()
    name: string;

    @Prop()
    totalRuns: number;

    @Prop()
    ratedRuns: number;

    @Prop()
    createdBy: string;
}

export const DisciplineSchema = SchemaFactory.createForClass(Discipline);

export type DisciplineDocument = Discipline & Document
