import { inject, Injectable} from "@angular/core";
import { DataStore } from "../../dataStore";
import { GridExpansionLimitationService } from "../../grid/gridExpansionLimitationService";
import { cellRegisterService } from "../../cell/cellRegisterService";
import { Utils } from "../../utils";
import { PathTracer } from "./PathTracer";

@Injectable({
  providedIn: 'root'
})

export class BfsMethod{
  
  data = inject(DataStore);
  gridBoundary = inject(GridExpansionLimitationService);
  instance = inject(cellRegisterService);
  pathTracer = inject(PathTracer);
  utils = new Utils();
  asyncController = new AbortController();

  starterCell!: string;
  cellAbove!: string;
  cellBelow!: string;
  cellRight!: string;
  cellLeft!: string;
  goalCellId!: string;

  setVariables(starterCell: string): void{
    
    const helper = this.utils.cellIdToCellNumber(starterCell);
    this.starterCell = starterCell;
    this.cellAbove = this.utils.cellNumberToCellId(helper - this.data.getColumnsQnty());
    this.cellBelow = this.utils.cellNumberToCellId(helper + this.data.getColumnsQnty());
    this.cellRight = this.utils.cellNumberToCellId(helper + 1);
    this.cellLeft = this.utils.cellNumberToCellId(helper - 1);
    
  }

  search(starterCellId: string): void{
    this.djisktraExpansion(starterCellId)
        .then(() => {
          if (this.goalCellId) this.pathTracer.reconstructPath(this.goalCellId);
        }); 
    }
  
  isGoalCell(targetCellId: string): void {
    if (this.instance.cell(targetCellId)!.isGoal) {
      this.asyncController.abort();
      this.goalCellId = targetCellId;
    }
  }

  expandCell(targetCellId: string): void {
    if (this.asyncController.signal.aborted) return; 
      this.isGoalCell(targetCellId);
      this.instance.cell(targetCellId)!.toNeighbor();
  }

  isAlreadyVisited(cellId: string): boolean{
    return this.instance.cell(cellId)!.isNeighbor;
  }
  
  isStart(cellId: string): boolean{
    return this.instance.cell(cellId)!.isStart;
  }

  isBlock(cellId: string): boolean{
    return this.instance.cell(cellId)!.isBlock;
  }

  async djisktraExpansion(targetCellId: string){

      if (!targetCellId || this.asyncController.signal.aborted) return;

      await this.utils.sleep(150);
      this.setVariables(targetCellId);

      const isCellAboveAvailable = this.gridBoundary.isPossibleToGoAbove(this.utils.cellIdToCellNumber(this.cellAbove)) 
        && !this.isAlreadyVisited(this.cellAbove) 
        && !this.isStart(this.cellAbove) 
        && !this.isBlock(this.cellAbove);
      const isCellBelowAvailable = this.gridBoundary.isPossibleToGoDown(this.utils.cellIdToCellNumber(this.cellBelow)) 
        && !this.isAlreadyVisited(this.cellBelow) 
        && !this.isStart(this.cellBelow) 
        && !this.isBlock(this.cellBelow);
      const isCellRightAvailable = this.gridBoundary.isPossibleToGoRight(this.utils.cellIdToCellNumber(targetCellId)) 
        && !this.isAlreadyVisited(this.cellRight) 
        && !this.isStart(this.cellRight) 
        && !this.isBlock(this.cellRight);
      const isCellLeftAvailable  = this.gridBoundary.isPossibleToGoLeft(this.utils.cellIdToCellNumber(this.cellLeft)) 
        && !this.isAlreadyVisited(this.cellLeft) 
        && !this.isStart(this.cellLeft) 
        && !this.isBlock(this.cellLeft);
        
      if (isCellAboveAvailable){      
        this.pathTracer.add(this.cellAbove, targetCellId)
        this.expandCell(this.cellAbove);
      } 
        
      if (isCellBelowAvailable){
        this.pathTracer.add(this.cellBelow, targetCellId)
        this.expandCell(this.cellBelow);
      }
      if (isCellRightAvailable) {
        this.pathTracer.add(this.cellRight, targetCellId)
        this.expandCell(this.cellRight);
      }
      if (isCellLeftAvailable){
        this.pathTracer.add(this.cellLeft, targetCellId)
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
  
}