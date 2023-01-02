import {Time} from "@angular/common";

export class Run {
  number: number = 1;
  points: number = 0;
  time: number = 0;
  arena: string = 'Eins';
  startTime: Time = {hours: 0, minutes: 0};
  remarks: string = 'Anmerkungen';
  referee: string = 'Schiri';
  firstReview: string = '';
  secondReview: string = '';
}
