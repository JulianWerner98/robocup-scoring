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
      lop: 5,
      lopEva: 3,
      sections: [
        {number: 1, value: 1, count: 4},
        {number: 2, value: 2, count: 9},
        {number: 3, value: 4, count: 10}],
      intersections: 5,
      seesaws: 1,
      obstacles: 1,
      ramps: 2,
      gaps: 4,
      bumper: 5,
      exit: true,
      rescueKitLevel: 2,
      rescueKit: true,
      evacuationLevel: 2,
      livingVictims: 2,
      deadVictims: 1,
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
      multiplier *= evaMultiplier * this.value.deadVictims;
    }
    return multiplier;
  }
}
