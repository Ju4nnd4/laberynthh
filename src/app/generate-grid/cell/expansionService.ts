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
  goalCell!: number;
  parentMap: Record<number, number> = {};

  controller = new AbortController();
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
    if (this.stop) return; 
    const id = "cell-" + targetCell;
    const instance = this.registerInstance.get(id);
    this.isGoalCell(targetCell); 
    // if (instance!.isStart) return;
    // if (instance!.isNeighbor) return;
    instance!.toNeighbor();
  }

  async reconstructPath(goalCell: number) {
  const path = [];
  let current = goalCell;
  while (current !== undefined) {
    console.log("pintando celda:", current);
    await this.sleep(100);
    let instance = this.registerInstance.get("cell-" + current);
    instance!.toPath();
    path.unshift(current);
    current = this.parentMap[current];
  }

  console.log("camino completo:", path);
  return path;
  }

  isAlreadyVisited(cellNumber: number){
    const instance = this.registerInstance.get("cell-" + cellNumber)
    return instance!.isNeighbor;
  }
  

  isStart(cellNumber: number){
    const instance = this.registerInstance.get("cell-" + cellNumber)
    return instance!.isStart;
  }

  isBlock(cellNumber: number){
    const instance = this.registerInstance.get("cell-" + cellNumber)
    return instance!.isBlock;
  }

  

  async djisktraExpansion(targetCell: number){

      if (!targetCell || this.visited.has(targetCell) || this.stop) return;

      this.visited.add(targetCell);
      await this.sleep(400);
      this.setVariablesForDjisktra(targetCell);

      const isCellAboveAvailable = this.rService.isPossibleToGoAbove(this.cellAbove) && !this.isAlreadyVisited(this.cellAbove) && !this.isStart(this.cellAbove) && !this.isBlock(this.cellAbove);
      const isCellBelowAvailable = this.rService.isPossibleToGoDown(this.cellBelow) && !this.isAlreadyVisited(this.cellBelow) && !this.isStart(this.cellBelow) && !this.isBlock(this.cellBelow);
      const isCellRightAvailable = this.rService.isPossibleToGoRight(targetCell) && !this.isAlreadyVisited(this.cellRight) && !this.isStart(this.cellRight) && !this.isBlock(this.cellRight);
      const isCellLeftAvailable  = this.rService.isPossibleToGoLeft(this.cellLeft) && !this.isAlreadyVisited(this.cellLeft) && !this.isStart(this.cellLeft) && !this.isBlock(this.cellLeft);
        
      if (isCellAboveAvailable){
        
        this.parentMap[this.cellAbove] = targetCell
        this.expandCell(this.cellAbove);
      } 
        
      if (isCellBelowAvailable){
        this.parentMap[this.cellBelow] = targetCell
        this.expandCell(this.cellBelow);
      }
      if (isCellRightAvailable) {
        this.parentMap[this.cellRight] = targetCell
        this.expandCell(this.cellRight);
      }
      if (isCellLeftAvailable){
        this.parentMap[this.cellLeft] = targetCell
        this.expandCell(this.cellLeft);
      }
        
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