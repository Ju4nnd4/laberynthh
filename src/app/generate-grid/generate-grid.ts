import { Component, Input, signal, computed, HostBinding, Output, EventEmitter, inject} from '@angular/core';
import { Cell } from './cell/cell';
import { StarterPointButton } from './starter-point-button/starter-point-button';
import { GoalPointButton } from './goal-point-button/goal-point-button';
import { FindButton } from './find-button/find-button';
import { StorizedData } from './storizedData';

@Component({
  selector: 'app-generate-grid',
  imports: [Cell, StarterPointButton, GoalPointButton, FindButton],
  templateUrl: './generate-grid.html',
  styleUrl: './generate-grid.scss',
})
export class GenerateGrid {
  data = inject(StorizedData);
  row: number = 0;
  column: number = 0;
  @Input() set shouldGenerate(value: boolean) {
    if (value) this.generateGrid(); // 👈 genera cuando el padre lo indica
  }
  
  
  @HostBinding('style.--columns') get columns() {
    return this.data.getColumnsQnty();
  }
  
  cells: {id: string, isActive: boolean}[] = [];
  
  generateGrid() {
    this.row = this.data.getRowsQnty();
    this.column = this.data.getColumnsQnty();
    
    const total = this.row * this.column;
    this.cells = Array.from({ length: total }, (_, i) => ({
      id: `cell-${i+1}`,
      isActive: false,
      starterPoint: false

    }));
     
  }
    

  transitionLayer(){
    
  }

  submitGrid(){
    this.generateGrid();
    this.transitionLayer();
  }


}
  
