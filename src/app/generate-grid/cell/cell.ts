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

  isStart: boolean = false;
  isGoal: boolean = false;

  constructor(private cService: CellService){

    this.cService.starterPointCellId.subscribe(id => {
      this.isStart = id == this.id
    })

    this.cService.goalPointCellId.subscribe(id => {
      this.isGoal = id == this.id
    })
  }

  toggleCell(){
    this.setStarterPointOnACell();
    this.setGoalPointOnACell();
  }

  setStarterPointOnACell(){

    this.cService.starterPointCellId.subscribe();
    
    if (this.cService.isStarterPointMarked.getValue()) {
    // Desactiva la celda anterior
    this.cService.starterPointCellId.next(this.id);
    this.isStart = true;
    }
  }

  setGoalPointOnACell(){

    this.cService.goalPointCellId.subscribe();
    
    if (this.cService.isGoalPointMarked.getValue()) {
    // Desactiva la celda anterior
    this.cService.goalPointCellId.next(this.id);
    this.isGoal = true;
    }
  }

}

