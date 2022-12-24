import {IsMongoId} from "class-validator";

export class FindRunDto {
    @IsMongoId()
    id: string;
}