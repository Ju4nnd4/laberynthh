import { Component, Input } from '@angular/core';
import { CellService } from './cellService';

@Component({
  selector: 'app-cell',
  imports: [],
  templateUrl: './cell.html',
  styleUrl: './cell.scss',
})
export class Cell {
  @Input() isActive: boolean = false;
  @Input() id: string = '';
  buttonText: string = this.id.toString();

  isStarterPoint: boolean = false;
  isGoal: boolean = false;

  constructor(private cService: CellService){

    this.cService.starterPointCellId.subscribe(id => {
      this.isStarterPoint = id == this.id
    })
  }

  starterActive = false;

  toggleCell(){
    this.setStarterPointOnACell();
  }

  setStarterPointOnACell(){

    this.cService.starterPointCellId.subscribe();
    
    if (this.cService.isStarterPointMarked.getValue()) {
    // Desactiva la celda anterior
    this.cService.starterPointCellId.next(this.id);
    this.isStarterPoint = true;
    }
  }

}

