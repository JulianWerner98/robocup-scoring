import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'GetSectionPoints'})
export class GetSectionPointsPipe implements PipeTransform {
  transform(number: number): number {
    switch (number) {
      case 1:
        return 5;
      case 2:
        return 3;
      case 3:
        return 1;
      default:
        return 0;
    }
  }
}

@Pipe({name: 'GetExitBonus'})
export class GetExitBonusPipe implements PipeTransform {
  transform(lops: number, exit: Boolean): number {
    return Math.max((60 - 5 * lops) * (exit ? 1 : 0), 0);
  }
}

@Pipe({name: 'GetRescueKitBonus'})
export class GetRescueKitBonusPipe implements PipeTransform {
  transform(rescue: Boolean, rescueKitLevel: number, evacuationLevel: number): number {
    if (rescue) {
      switch (evacuationLevel) {
        case 1:
          return rescueKitLevel === 1 ? 1.1 : 1.3;
        case 2:
          return rescueKitLevel === 1 ? 1.2 : 1.6;
      }
    }
    return 1;
  }
}

@Pipe({name: 'GetVictimsBonus'})
export class GetVictimsBonusPipe implements PipeTransform {
  transform(victims: number, level: number): number {
    return Math.max((level === 1 ? 1.2 : 1.4) * victims, 1);
  }
}

@Pipe({name: 'GetDeduction'})
export class GetDeductionPipe implements PipeTransform {
  transform(lops: number, level: number): number {
    return level === 1 ? 0.025 * lops : 0.05 * lops;
  }
}
