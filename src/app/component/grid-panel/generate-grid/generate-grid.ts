import { Component, HostBinding, inject, effect} from '@angular/core';
import { Cell } from '../cell/cell';
import { StorizedData } from '../../../service/dataStore';
import { GridEventService } from '../../../service/grid/gridEventService';
import { CellModel } from '../../../model/cellModel';


@Component({
  selector: 'app-generate-grid',
  imports: [Cell],
  templateUrl: './generate-grid.html',
  styleUrl: './generate-grid.scss',
})
export class GenerateGrid{
  data = inject(StorizedData);
  gridEvent = inject(GridEventService);
  row: number = 0;
  column: number = 0;

  constructor() {
    effect(() => {
      if (this.gridEvent.showGrid()) {
        this.generateGrid();
      }
    });
  }
  
  @HostBinding('style.--columns') get columns() {
    return this.data.getColumnsQnty();
  }
  
  cells: CellModel[] = [];
  
  generateGrid() {
    this.row = this.data.getRowsQnty();
    this.column = this.data.getColumnsQnty();
    
    const total = this.row * this.column;
    this.cells = Array.from({ length: total }, (_, i) => ({
      id: `cell-${i+1}`,
      isStart: false,
      isGoal: false,
      isBlock: false,
      isPath: false

    }));
     
  }


}
  
