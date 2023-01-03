import {IsMongoId} from "class-validator";

export class FindTeamDto {
    @IsMongoId()
    id: string;
}