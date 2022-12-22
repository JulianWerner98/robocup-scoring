import {Discipline} from "../discipline.schema";
import {ArrayMinSize, IsArray, IsNotEmpty} from "class-validator";

export class CreateDiscipline {
    @IsArray()
    @ArrayMinSize(1)
    disciplines: string[];
}