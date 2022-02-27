import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.scss']
})
export class CheckBoxComponent {

  @Input() id: string | number;
  @Input() checked = false;

  clickHandler(): void {
    this.checked = !this.checked;
  }
}
