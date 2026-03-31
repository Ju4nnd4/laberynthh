import { Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GenerateGridButton } from "./generate-grid-button/generate-grid-button";

@Component({
  selector: 'app-input-row-column',
  imports: [FormsModule, GenerateGridButton],
  templateUrl: './input-row-column.html',
  styleUrl: './input-row-column.scss',
})
export class InputRowColumn {
  row: number = 0;
  column: number = 0;

}
