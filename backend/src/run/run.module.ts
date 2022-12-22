import { Module } from '@nestjs/common';
import { RunController } from './run.controller';
import { RunService } from './run.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Run, RunSchema} from "./run.schema";

@Module({
  imports: [
      MongooseModule.forFeature([{name: Run.name, schema: RunSchema}]),
  ],
  controllers: [RunController],
  providers: [RunService]
})
export class RunModule {}
