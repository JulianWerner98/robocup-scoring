import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {
  @Input() section: {number: number, value: number, count: number} = {number: 1, value: 0, count: 0};
  @Output() sectionChange = new EventEmitter<number>();
  buttons: Boolean[] = [false, false, false, false]

  constructor() {
  }

  ngOnInit(): void {
    this.buttons[this.section.value-1] = true;
  }


  buttonClicked(number: number) {
    this.buttons = [false, false, false, false]
    this.buttons[number] = true;
    this.sectionChange.emit(number);
  }
}
