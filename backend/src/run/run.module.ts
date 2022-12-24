import { Module } from '@nestjs/common';
import { RunController } from './run.controller';
import { RunService } from './run.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Run, RunSchema} from "./run.schema";
import {ScoreService} from "../score/score.service";
import {ScoreModule} from "../score/score.module";

@Module({
  imports: [
      MongooseModule.forFeature([{name: Run.name, schema: RunSchema}]),
      ScoreModule
  ],
  controllers: [RunController],
  providers: [RunService]
})
export class RunModule {}
