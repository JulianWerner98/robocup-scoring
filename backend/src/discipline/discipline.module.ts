import { Module } from '@nestjs/common';
import { DisciplineController } from './discipline.controller';
import { DisciplineService } from './discipline.service';
import {Discipline, DisciplineSchema} from "./discipline.schema";
import {MongooseModule} from "@nestjs/mongoose";

@Module({
  imports: [
      MongooseModule.forFeature([{name: Discipline.name, schema: DisciplineSchema}])
  ],
  controllers: [DisciplineController],
  providers: [DisciplineService]
})
export class DisciplineModule {}
