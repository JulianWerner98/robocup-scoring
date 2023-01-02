import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {LineRun} from "../create-line/model/line-run";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-sheet-line',
  templateUrl: './sheet-line.component.html',
  styleUrls: ['./sheet-line.component.scss']
})
export class SheetLineComponent implements OnInit, AfterViewInit {

  @ViewChild('pdf') pdfHTML: ElementRef | undefined;
  @Input('run') run: LineRun = new LineRun();
  sectionCount: number = 4;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(params['kind']);
      console.log(params['id']);
    });
  }

  ngAfterViewInit(): void {
  }


  sectionChange(witchSection: number, sectionCount: number) {
    console.log(witchSection, sectionCount);
  }
}
