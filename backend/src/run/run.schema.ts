import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
export class LineExtention {

    lop: number;
    lopEva: number;

    sections: {
        number: number,
        value: number,
        count: number,
    }[];

    intersections: number;
    seesaws: number;
    obstacles: number;
    ramps: number;
    gaps: number;
    bumper: number;
    exit: Boolean;

    rescueKitLevel: number;
    rescueKit: Boolean;

    evacuationLevel: number;
    livingVictims: number;
    deadVictims: number;
}

@Schema({timestamps: true})
export class Run {

    @Prop()
    number: number;

    @Prop()
    points: number;

    @Prop()
    time: number;

    @Prop()
    startTime: number;

    @Prop()
    firstReview: string;

    @Prop()
    secondReview: string;

    @Prop(LineExtention)
    value: LineExtention
}

export const RunSchema = SchemaFactory.createForClass(Run);

export type RunDocument = Run & Document