import { Component, Input, signal, computed, HostBinding, Output, EventEmitter } from '@angular/core';
import { Cell } from './cell/cell';
import { StarterPointButton } from './starter-point-button/starter-point-button';

@Component({
  selector: 'app-generate-grid',
  imports: [Cell, StarterPointButton],
  templateUrl: './generate-grid.html',
  styleUrl: './generate-grid.scss',
})
export class GenerateGrid {
  @Input() row!: number;
  @Input() column!: number;
  @Input() set shouldGenerate(value: boolean) {
    if (value) this.generateGrid(); // 👈 genera cuando el padre lo indica
  }
  columnUpdate = 0;
  
  
  @HostBinding('style.--columns') get columns() {
    return this.columnUpdate;
  }
  
  cells: {id: string, isActive: boolean}[] = [];
  
  generateGrid() {
    const total = this.row * this.column;
    this.cells = Array.from({ length: total }, (_, i) => ({
      id: `cell-${i+1}`,
      isActive: false

    }));
    this.columnUpdate = this.column;    
  }
  
  transitionLayer(){
    
  }

  submitGrid(){
    this.generateGrid();
    this.transitionLayer();
  }


}
  
