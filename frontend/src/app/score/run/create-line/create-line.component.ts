import { Component, OnInit } from '@angular/core';
import {LineRun} from "./model/line-run";

@Component({
  selector: 'app-create-line',
  templateUrl: './create-line.component.html',
  styleUrls: ['./create-line.component.scss']
})
export class CreateLineComponent implements OnInit {
  run: LineRun = new LineRun();
  subtotal: number = 0;
  multiplier: number = 1;
  constructor() { }

  ngOnInit(): void {
    this.calculate();
  }

  calculate() {
    this.subtotal = this.run.calculateSubtotal();
    this.multiplier = this.run.calculateMultiplier();
    this.run.points = Math.round(this.subtotal * this.multiplier);
  }

}
