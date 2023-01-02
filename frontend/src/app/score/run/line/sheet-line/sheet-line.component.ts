import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {LineRun} from "../create-line/model/line-run";
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

  sectionChange(witchSection: number, sectionCount: number) {

    console.log(witchSection, sectionCount);
    this.run.value.sections[witchSection].value = sectionCount+1;
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
}
