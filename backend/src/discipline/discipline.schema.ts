import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

@Schema()
export class Discipline {

    @Prop()
    name: string;

    @Prop()
    totalRuns: number;

    @Prop()
    ratedRuns: number;
}

export const DisciplineSchema = SchemaFactory.createForClass(Discipline);

export type DisciplineDocument = Discipline & Document
