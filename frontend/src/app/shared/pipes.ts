import {Pipe, PipeTransform} from "@angular/core";
import {Run} from "../score/dto/score.dto";

@Pipe({name: 'GetArrayWithNumbers'})
export class GetArrayWithNumbersPipe implements PipeTransform {
  transform(count: number): number[] {
    return Array.from(Array(count + 1).keys())
  }
}

@Pipe({name: 'GetRunFromRuns'})
export class GetRunFromRunsPipe implements PipeTransform {
  transform(number: number, runs: Run[]): any | undefined {
    return runs.find((run: Run) => run.number === number);
  }
}

@Pipe({name: 'SecondsToTime'})
export class SecondsToTimePipe implements PipeTransform {
  transform(number: number): string {
    if (number) {
    return (number > 600 ? "" : "0") + Math.floor(number / 60) + ":"+ (number % 60 > 9 ? "" : "0") + number % 60;
    }
    return "00:00";
  }
}
