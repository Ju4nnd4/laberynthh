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
  path: Record<number, number> =  {}
  goalCell!: number;
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
    console.log("Esta es la meta: " + this.goalCell);
    this.reconstructPath(this.goalCell);
  }
  
  isGoalCell(targetCell: number): void {
  const id = "cell-" + targetCell;
  const instance = this.registerInstance.get(id);
  if (instance!.isGoal) {
    this.stop = true;
    this.goalCell = targetCell;
    this.reconstructPath(targetCell);
    }
  }

  expandCell(targetCell: number): void {
    const id = "cell-" + targetCell;
    const instance = this.registerInstance.get(id);
    this.isGoalCell(targetCell); 
    if (instance!.isStart) return;
    if (this.stop) return; 
    instance!.toNeighbor();
  }

  reconstructPath(goalCell: number): number[] {
    const pathFinded = [];
    let current = goalCell;
    while (current !== undefined) {
      let instance = this.registerInstance.get("cell-" + current)
      instance!.toPath();
      pathFinded.unshift(current);
      current = this.path[current];
      console.log(pathFinded);

    }
    return pathFinded; // [start, ..., goal]
  }


  async djisktraExpansion(targetCell: number){

      if (!targetCell || this.visited.has(targetCell) || this.stop) return;

      this.visited.add(targetCell);
      await this.sleep(400);
      this.setVariablesForDjisktra(targetCell);

      const isCellAboveAvailable = this.rService.isPossibleToGoAbove(this.cellAbove);
      const isCellBelowAvailable = this.rService.isPossibleToGoDown(this.cellBelow);
      const isCellRightAvailable = this.rService.isPossibleToGoRight(targetCell);
      const isCellLeftAvailable  = this.rService.isPossibleToGoLeft(this.cellLeft);

      if (isCellAboveAvailable && !(this.cellAbove in this.path)) this.path[this.cellAbove] = targetCell;
      if (isCellBelowAvailable && !(this.cellBelow in this.path)) this.path[this.cellBelow] = targetCell;
      if (isCellRightAvailable && !(this.cellRight in this.path)) this.path[this.cellRight] = targetCell;
      if (isCellLeftAvailable  && !(this.cellLeft  in this.path)) this.path[this.cellLeft]  = targetCell;

        
        
      
        console.log(this.path);

        
        if (isCellAboveAvailable) this.expandCell(this.cellAbove);
        if (isCellBelowAvailable) this.expandCell(this.cellBelow);
        if (isCellRightAvailable) this.expandCell(this.cellRight);
        if (isCellLeftAvailable)  this.expandCell(this.cellLeft);
        
        if (this.stop) return;
        
        await Promise.all([
          isCellAboveAvailable ? this.djisktraExpansion(this.cellAbove) : Promise.resolve(),
        isCellBelowAvailable ? this.djisktraExpansion(this.cellBelow) : Promise.resolve(),
        isCellRightAvailable ? this.djisktraExpansion(this.cellRight) : Promise.resolve(),
        isCellLeftAvailable  ? this.djisktraExpansion(this.cellLeft)  : Promise.resolve(),
      ]);
      
    }
  
  sleep(ms: number){
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
}