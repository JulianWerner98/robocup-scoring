import {IsNumber} from "class-validator";

export class UpdateDisciplineDto {
  @IsNumber()
  ratedRuns: number;

  @IsNumber()
  totalRuns: number;
}