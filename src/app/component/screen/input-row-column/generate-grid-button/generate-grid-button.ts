import { Component, inject, Input} from '@angular/core';
import { DataStore } from '../../../../service/dataStore';
import { GridEventService } from '../../../../service/grid/gridEventService';
import { ScreenChanger } from '../../../../service/screen/screenChanger';
import { ResetService } from '../../../../service/reset';

@Component({
  selector: 'app-generate-grid-button',
  imports: [],
  templateUrl: './generate-grid-button.html',
  styleUrl: './generate-grid-button.scss',
})
export class GenerateGridButton {

  @Input() row: number = 0;
  @Input() column: number = 0;


  data = inject(DataStore);
  gridEvent = inject(GridEventService);
  screenChanger = inject(ScreenChanger);
  reset = inject(ResetService);

  onGenerate() {
    this.reset.reset();
    this.data.setColumnsQnty(this.column);
    this.data.setRowsQnty(this.row);
    this.gridEvent.generateGrid();
    this.screenChanger.changeScreen('gridScreen');
    }
}
