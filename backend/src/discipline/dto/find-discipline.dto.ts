import {IsMongoId} from "class-validator";

export class FindDisciplineDto {
  @IsMongoId()
  id: string;
}