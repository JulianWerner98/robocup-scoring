import {Run} from "../../../model/run";

export class LineRun extends Run {
  value: {
    lop: number,
    lopEva: number,

    sections: {
      number: number,
      value: number,
      count: number,
    }[],

    intersections: number,
    seesaws: number,
    obstacles: number,
    ramps: number,
    gaps: number,
    bumper: number,
    exit: Boolean,

    rescueKitLevel: number,
    rescueKit: Boolean,

    evacuationLevel: number,
    livingVictims: number,
    deadVictims: number,
  }

  constructor() {
    super();
    this.value = {
      lop: 0,
      lopEva: 0,
      sections: [
        {number: 1, value: 4, count: 5},
        {number: 2, value: 4, count: 5},
        {number: 3, value: 4, count: 5},
        {number: 4, value: 4, count: 5}],
      intersections: 0,
      seesaws: 0,
      obstacles: 0,
      ramps: 0,
      gaps: 0,
      bumper: 0,
      exit: false,
      rescueKitLevel: 0,
      rescueKit: false,
      evacuationLevel: 0,
      livingVictims: 0,
      deadVictims: 0,
    }
    return this;
  }

  calculateSubtotal() {
    let subtotal = 5;
    this.value.sections.forEach(section => {
      subtotal += this.getSectionPoints(section.value) * section.count;
    });
    subtotal += this.value.intersections * 10;
    subtotal += this.value.seesaws * 15;
    subtotal += this.value.obstacles * 15;
    subtotal += this.value.ramps * 10;
    subtotal += this.value.gaps * 10;
    subtotal += this.value.bumper * 5;
    subtotal += this.value.exit ? Math.max(60 - (5 * (this.value.lop + this.value.lopEva)), 0) : 0;
    return subtotal;
  }

  private getSectionPoints(number: number) {
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

  calculateMultiplier() {
    let multiplier = 1;
    let evaMultiplier = 1;
    let rescueMultiplier = 1;
    let deduction = (this.value.evacuationLevel === 1 ? 0.025 : 0.05) * (this.value.lopEva);

    switch (this.value.evacuationLevel) {
      case 1:
        evaMultiplier = 1.2;
        rescueMultiplier = this.value.rescueKitLevel === 1 ? 1.1 : 1.3;
        break;
      case 2:
        evaMultiplier = 1.4;
        rescueMultiplier = this.value.rescueKitLevel === 1 ? 1.2 : 1.6;
    }
    rescueMultiplier = Math.max(rescueMultiplier - deduction, 1);
    evaMultiplier = Math.max(evaMultiplier - deduction, 1);
    multiplier *= Math.max(rescueMultiplier * (this.value.rescueKit ? 1 : 0), 1);
    multiplier *= Math.pow(evaMultiplier, this.value.livingVictims);
    if (this.value.livingVictims === 2) {
      multiplier *= Math.max(evaMultiplier * this.value.deadVictims,1);
    }
    return multiplier;
  }
}
