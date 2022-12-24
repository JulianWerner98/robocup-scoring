import {IsNumber} from "class-validator";

export class CreateRunDto {
    @IsNumber()
    runNumber: number;
}