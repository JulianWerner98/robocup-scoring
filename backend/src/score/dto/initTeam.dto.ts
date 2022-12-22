import {Prop} from "@nestjs/mongoose";
import {IsArray, IsMongoId, IsNotEmpty, IsString} from "class-validator";
import {Score} from "../score.schema";

export class InitTeamDto {
    @IsArray()
    scores: Score[];
}