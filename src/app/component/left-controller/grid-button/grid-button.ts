import { Component, inject } from '@angular/core';
import { ScreenChanger } from '../../../service/screen/screenChanger';

@Component({
  selector: 'app-grid-button',
  imports: [],
  templateUrl: './grid-button.html',
  styleUrl: './grid-button.scss',
})
export class GridButton {

  screenChanger = inject(ScreenChanger);

  onClick() {
    this.screenChanger.changeScreen('inputRowColumnScreen');
  }
}
