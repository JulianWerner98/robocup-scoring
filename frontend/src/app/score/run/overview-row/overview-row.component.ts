import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-overview-row',
  templateUrl: './overview-row.component.html',
  styleUrls: ['./overview-row.component.scss']
})
export class OverviewRowComponent implements OnInit {

  @Input() title: string = "";
  @Input() count: string = "";
  @Input() value: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
