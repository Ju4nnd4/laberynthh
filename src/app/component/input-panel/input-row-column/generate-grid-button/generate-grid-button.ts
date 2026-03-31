import { Component, inject, Input} from '@angular/core';
import { StorizedData } from '../../../../service/dataStore';
import { GridEventService } from '../../../../service/grid/gridEventService';

@Component({
  selector: 'app-generate-grid-button',
  imports: [],
  templateUrl: './generate-grid-button.html',
  styleUrl: './generate-grid-button.scss',
})
export class GenerateGridButton {

  @Input() row: number = 0;
  @Input() column: number = 0;

  data = inject(StorizedData);
  gridEvent = inject(GridEventService);

  onGenerate() {
    this.data.setColumnsQnty(this.column);
    this.data.setRowsQnty(this.row);
    this.gridEvent.toggleToShowGrid();
    }
}
