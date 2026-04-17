import { Component, inject} from '@angular/core';
import { GenerateGrid } from "./generate-grid/generate-grid";
import { InputRowColumn } from "./input-row-column/input-row-column";
import { ScreenChanger } from '../../service/screen/screenChanger';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-screen',
  imports: [GenerateGrid, InputRowColumn],
  templateUrl: './screen.html',
  styleUrl: './screen.scss',
})
export class Screen {

  screenChanger = inject(ScreenChanger);

  constructor() {
    this.screenChanger.changeScreen('gridScreen');
  }

  /*
    Guardar el valor de tipo screen
    entonces si es true
    volvera false el resto
    y hara visible el contenido del screen

  */
}
