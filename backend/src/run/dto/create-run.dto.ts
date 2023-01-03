import {IsNotEmpty, IsNumber, IsString} from "class-validator";
import {LineExtention, Run} from "../run.schema";

export class CreateRunDto {
    @IsNotEmpty()
    run: Run;

}