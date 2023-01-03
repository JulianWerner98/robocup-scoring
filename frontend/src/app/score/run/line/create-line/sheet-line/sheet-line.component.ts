import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {LineRun} from "../model/line-run";
import {ActivatedRoute} from "@angular/router";
import {timeout} from "rxjs";

@Component({
  selector: 'app-sheet-line',
  templateUrl: './sheet-line.component.html',
  styleUrls: ['./sheet-line.component.scss']
})
export class SheetLineComponent implements OnInit {

  @ViewChild('pdf') pdfHTML: ElementRef | undefined;
  @Input('run') run: LineRun = new LineRun();
  @Input() teamname = "";
  @Output('valueChanged') valueChangedEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  sectionChange(section: { number: number, value: number, count: number }, sectionCount: number) {
    this.run.value.sections[section.number].value = sectionCount+1;
    this.valueChangedEvent.emit();
  }

  valueChanged() {
    this.valueChangedEvent.emit();
  }

  victimsChanged(whichVictim: number) {
    if(whichVictim == 2) {
      if(this.run.value.livingVictims == 2) {
        this.run.value.livingVictims = this.run.value.livingVictims - 1;
      } else {
        this.run.value.livingVictims = this.run.value.livingVictims + 1;
      }
    } else {
      if(this.run.value.livingVictims > 0) {
        this.run.value.livingVictims = this.run.value.livingVictims - 1;
      } else {
        this.run.value.livingVictims = this.run.value.livingVictims + 1;
      }
    }
    this.valueChangedEvent.emit();
  }

  timeChanged(time: HTMLInputElement) {
    this.run.time = +time.value.substring(0,2)*60 + +time.value.substring(3,6);
  }

  startTimeChanged(time: HTMLInputElement) {
    this.run.startTime = +time.value.substring(0,2)*60 + +time.value.substring(3,6);
  }
}
