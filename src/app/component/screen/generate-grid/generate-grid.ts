import { Component, HostBinding, inject, effect} from '@angular/core';
import { DataStore } from '../../../service/dataStore';
import { GridEventService } from '../../../service/grid/gridEventService';
import { CellModel } from '../../../model/cellModel';
import { Cell } from '../cell/cell';


@Component({
  selector: 'app-generate-grid',
  imports: [Cell],
  templateUrl: './generate-grid.html',
  styleUrl: './generate-grid.scss',
})
export class GenerateGrid{
  data = inject(DataStore);
  gridEvent = inject(GridEventService);
  row: number = 10;
  column: number = 10;

  constructor() {
    effect(() => {
      if (this.gridEvent.showGrid()) {
        this.gridEvent.generateGrid();
      }
    });

    this.gridEvent.generateGrid()
  }
  
  @HostBinding('style.--columns') get columns() {
    return this.data.getColumnsQnty();
  }
  
  
  


}
  
