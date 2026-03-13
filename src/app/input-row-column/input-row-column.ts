import { Component} from '@angular/core';
import { GenerateGrid } from '../generate-grid/generate-grid';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-row-column',
  imports: [GenerateGrid, FormsModule],
  templateUrl: './input-row-column.html',
  styleUrl: './input-row-column.scss',
})
export class InputRowColumn {
  row: number = 0;
  column: number = 0;
  showGrid = false;

  onGenerate() {
    this.showGrid = true;
  }


}
