import { Component, Input, OnDestroy, OnInit, inject} from '@angular/core';
import { CellService } from './cellService';
import { StorizedData } from '../storizedData';
import { cellRegisterService } from './cellRegisterService';

@Component({
  selector: 'app-cell',
  imports: [],
  templateUrl: './cell.html',
  styleUrl: './cell.scss',
})
export class Cell implements OnInit, OnDestroy {
  @Input() isActive: boolean = false;
  @Input() id: string = '';
  buttonText: string = this.id.toString();
  isStart: boolean = false;
  isGoal: boolean = false;
  isNeighbor: boolean = false;
  isPath: boolean = false;
  isBlock: boolean = false;
  data = inject(StorizedData);

  constructor(private cService: CellService, private registerInstance: cellRegisterService){

    this.cService.starterPointCellId.subscribe(id => {
      this.isStart = id == this.id
    })

    this.cService.goalPointCellId.subscribe(id => {
      this.isGoal = id == this.id
    })

  }

  ngOnInit() {
    this.registerInstance.register(this.id, this);
  }

  ngOnDestroy() {
    this.registerInstance.delete(this.id);  // organizar este menjurje
  }


  toggleCell(){
    this.setStarterPointOnACell();
    this.setGoalPointOnACell();
    this.setBlockPointOnACell();
  }

  toNeighbor(){
    this.isNeighbor = !this.isNeighbor;
    const cell = document.getElementById(this.id)
    if(this.isNeighbor){
      cell!.classList.add("walked");
    } else {
      cell!.classList.remove("walked");
    }
  }
  
  toBlock(){
    this.isBlock = !this.isBlock;
    const cell = document.getElementById(this.id)
    if(this.isBlock){
      cell!.classList.add("obstacle");
    } else {
      cell!.classList.remove("obstacle");
    }
  }

  toPath(){
    this.isPath = true;
    const cell = document.getElementById(this.id)
    cell!.classList.add("tracePath");
  }

  setBlockPointOnACell(){
    if(this.cService.isBlockButtonMarked.getValue()){
      this.toBlock();
    }
  }



  setStarterPointOnACell(){

    this.cService.starterPointCellId.subscribe();
    
    if (this.cService.isStarterPointMarked.getValue()) {

    this.cService.starterPointCellId.next(this.id);
    this.data.setStarterCell(this.id);
    this.isStart = true;
    }
  }

  setGoalPointOnACell(){

    this.cService.goalPointCellId.subscribe();
    
    if (this.cService.isGoalPointMarked.getValue()) {
    // Desactiva la celda anterior
    this.cService.goalPointCellId.next(this.id);
    this.data.setGoalCell(this.id)
    this.isGoal = true;
    }
  }


}

