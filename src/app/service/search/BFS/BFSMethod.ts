import { inject, Injectable} from "@angular/core";
import { DataStore } from "../../dataStore";
import { GridExpansionLimitationService } from "../../grid/gridExpansionLimitationService";
import { cellRegisterService } from "../../cell/cellRegisterService";
import { Utils } from "../../utils";

@Injectable({
  providedIn: 'root'
})

export class BfsMethod{
  
  data = inject(DataStore);
  gridBoundary = inject(GridExpansionLimitationService);
  instance = inject(cellRegisterService);
  utils = new Utils();
  asyncController = new AbortController();

  starterCell!: number;
  cellAbove!: number;
  cellBelow!: number;
  cellRight!: number;
  cellLeft!: number;
  parentMap: Record<number, number> = {};

  setVariables(starterCell: number): void{
    
    this.starterCell = starterCell;
    this.cellAbove = this.starterCell - this.data.getColumnsQnty();
    this.cellBelow = this.starterCell + this.data.getColumnsQnty();
    this.cellRight = this.starterCell + 1;
    this.cellLeft = this.starterCell - 1;
    
  }

  search(starterCellId: string): void{
    this.djisktraExpansion(this.utils.cellIdToCellNumber(starterCellId));
  }
  
  isGoalCell(targetCellNumber: number): void {
  const instance = this.instance.get(this.utils.cellNumberToCellId(targetCellNumber));
  if (instance!.isGoal) {
    this.asyncController.abort();
    this.reconstructPath(targetCellNumber);
    }
  }

  expandCell(targetCellNumber: number): void {
    if (this.asyncController.signal.aborted) return; 
    const instance = this.instance.get(this.utils.cellNumberToCellId(targetCellNumber));
    this.isGoalCell(targetCellNumber);
    instance!.toNeighbor();
  }

  async reconstructPath(goalCellNumber: number) {
    const path = [];
    let currentCellNumber = goalCellNumber;
    while (currentCellNumber !== undefined) {
      await this.sleep(100);
      let instance = this.instance.get(this.utils.cellNumberToCellId(currentCellNumber));
      instance!.toTracePath();
      path.unshift(currentCellNumber);
      currentCellNumber = this.parentMap[currentCellNumber];
    }
    return path;
  }

  isAlreadyVisited(cellNumber: number): boolean{
    return this.instance.get(this.utils.cellNumberToCellId(cellNumber))!.isNeighbor;
  }
  

  isStart(cellNumber: number): boolean{
    return this.instance.get(this.utils.cellNumberToCellId(cellNumber))!.isStart;
  }

  isBlock(cellNumber: number): boolean{
    return this.instance.get(this.utils.cellNumberToCellId(cellNumber))!.isBlock;
  }

  async djisktraExpansion(targetCell: number){

      if (!targetCell || this.asyncController.signal.aborted) return;

      await this.sleep(150);
      this.setVariables(targetCell);

      const isCellAboveAvailable = this.gridBoundary.isPossibleToGoAbove(this.cellAbove) 
        && !this.isAlreadyVisited(this.cellAbove) 
        && !this.isStart(this.cellAbove) 
        && !this.isBlock(this.cellAbove);
      const isCellBelowAvailable = this.gridBoundary.isPossibleToGoDown(this.cellBelow) 
        && !this.isAlreadyVisited(this.cellBelow) 
        && !this.isStart(this.cellBelow) 
        && !this.isBlock(this.cellBelow);
      const isCellRightAvailable = this.gridBoundary.isPossibleToGoRight(targetCell) 
        && !this.isAlreadyVisited(this.cellRight) 
        && !this.isStart(this.cellRight) 
        && !this.isBlock(this.cellRight);
      const isCellLeftAvailable  = this.gridBoundary.isPossibleToGoLeft(this.cellLeft) 
        && !this.isAlreadyVisited(this.cellLeft) 
        && !this.isStart(this.cellLeft) 
        && !this.isBlock(this.cellLeft);
        
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
        
      if (this.asyncController.signal.aborted) return;
        
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