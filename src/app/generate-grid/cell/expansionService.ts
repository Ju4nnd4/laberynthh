import { inject, Injectable, Renderer2, Inject } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { StorizedData } from "../storizedData";
import { GridExpansionLimitationService } from "./gridExpansionLimitationService";
import { StarterPointButton } from "../starter-point-button/starter-point-button";
import { cellRegisterService } from "./cellRegisterService";

@Injectable({
  providedIn: 'root'
})

export class ExpansionService{
  
  data = inject(StorizedData);
  rService = inject(GridExpansionLimitationService);
  visited = new Set<number>();
  registerInstance = inject(cellRegisterService);

  starterCell!: number;
  cellAbove!: number;
  cellBelow!: number;
  cellRight!: number;
  cellLeft!: number;
  stop!: boolean;
  //goalCellNumber: number = parseInt(this.goalCellId.replace("cell-", ""), 10);
  setVariablesForDjisktra(starterCell: number): void{
    
    this.starterCell = starterCell;
    this.cellAbove = this.starterCell - this.data.getColumnsQnty();
    this.cellBelow = this.starterCell + this.data.getColumnsQnty();
    this.cellRight = this.starterCell + 1;
    this.cellLeft = this.starterCell - 1;
    
  }
  
  djisktraFind(starterCellId: string): void{
    this.visited.clear();
    const starterCell = parseInt(starterCellId.replace("cell-", ""), 10);
    this.djisktraExpansion(starterCell);
  }
  
  expandCell(targetCell: number):any{
    const id: string = "cell-" + targetCell;
    console.log(id);
    const instance = this.registerInstance.get(id);
    if(instance!.isGoal){
      return this.stop = true;
    } 
    instance!.toNeighbor();
  }

  didWeFindGoal(){
    if(this.stop){
      return;
    }
  }

  async djisktraExpansion(targetCell: number){

    if (!targetCell || this.visited.has(targetCell) || this.stop) return;
    this.visited.add(targetCell);

    await this.sleep(400);
    
    this.setVariablesForDjisktra(targetCell);
    
    let isCellAboveAvailable: boolean = this.rService.isPossibleToGoAbove(this.cellAbove);
    let isCellBelowAvailable: boolean = this.rService.isPossibleToGoDown(this.cellBelow);
    // FIX ME: isPossibleToGoRight the only way it works is taking evaluating
    let isCellRightAvailable: boolean = this.rService.isPossibleToGoRight(targetCell);
    let isCellLeftAvailable: boolean = this.rService.isPossibleToGoLeft(this.cellLeft);
    
    this.didWeFindGoal()
    if (isCellAboveAvailable)   this.expandCell(this.cellAbove);
    this.didWeFindGoal()
    if (isCellBelowAvailable)   this.expandCell(this.cellBelow);
    this.didWeFindGoal()
    if (isCellRightAvailable)   this.expandCell(this.cellRight);
    this.didWeFindGoal()
    if (isCellLeftAvailable)    this.expandCell(this.cellLeft);
    this.didWeFindGoal()
    
    if (isCellAboveAvailable)   this.djisktraExpansion(this.cellAbove);
    this.didWeFindGoal()
    if (isCellBelowAvailable)   this.djisktraExpansion(this.cellBelow);
    this.didWeFindGoal()
    if (isCellRightAvailable)   this.djisktraExpansion(this.cellRight);
    this.didWeFindGoal()
    if (isCellLeftAvailable)    this.djisktraExpansion(this.cellLeft);
    this.didWeFindGoal()
  }

  sleep(ms: number){
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}