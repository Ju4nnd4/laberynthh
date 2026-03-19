import { Component, inject} from '@angular/core';
import { GenerateGrid } from '../generate-grid/generate-grid';
import { FormsModule } from '@angular/forms';
import { StorizedData } from '../generate-grid/storizedData';

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
  data = inject(StorizedData);

  onGenerate() {
    this.showGrid = true;
    this.data.setColumnsQnty(this.column);
    this.data.setRowsQnty(this.row);
  }



}
