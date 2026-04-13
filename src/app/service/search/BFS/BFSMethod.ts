import { inject, Injectable} from "@angular/core";
import { DataStore } from "../../dataStore";
import { GridExpansionLimitationService } from "../../grid/gridExpansionLimitationService";
import { cellRegisterService } from "../../cell/cellRegisterService";
import { Utils } from "../../utils";
import { PathTracer } from "./PathTracer";
import { Neighbor } from "../../../model/neighborModel";

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

  goalCellId!: string;

  calculateNeighbors(starterCell: string): Neighbor {
    
    const helper = this.utils.cellIdToCellNumber(starterCell);

    return  {
      starterCell: starterCell,
      above: this.utils.cellNumberToCellId(helper - this.data.getColumnsQnty()),
      below: this.utils.cellNumberToCellId(helper + this.data.getColumnsQnty()),
      right: this.utils.cellNumberToCellId(helper + 1),
      left: this.utils.cellNumberToCellId(helper - 1)
    }

  }

  search(starterCellId: string): void {
    this.exploreFrom(starterCellId)
        .then(() => {
          console.log('goalCellId:', this.goalCellId); 
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

  isAlreadyVisited(cellId: string): boolean{ return this.instance.cell(cellId)!.isNeighbor; }

  isStart(cellId: string): boolean { return this.instance.cell(cellId)!.isStart; }

  isBlock(cellId: string): boolean { return this.instance.cell(cellId)!.isBlock; }
  
  isCellAboveAvailable(cellAbove: string): boolean{
     if (!this.instance.exist(cellAbove)) return false; 
    return this.gridBoundary.isPossibleToGoAbove(this.utils.cellIdToCellNumber(cellAbove)) 
        && !this.isAlreadyVisited(cellAbove) 
        && !this.isStart(cellAbove) 
        && !this.isBlock(cellAbove);
  }
  
  isCellBelowAvailable(cellBelow: string): boolean{
    if (!this.instance.exist(cellBelow)) return false; 
    return this.gridBoundary.isPossibleToGoDown(this.utils.cellIdToCellNumber(cellBelow)) 
        && !this.isAlreadyVisited(cellBelow) 
        && !this.isStart(cellBelow) 
        && !this.isBlock(cellBelow);
  }

  isCellRightAvailable(cellRight: string): boolean{
    if (!this.instance.exist(cellRight)) return false; 
    return this.gridBoundary.isPossibleToGoRight(this.utils.cellIdToCellNumber(cellRight)) 
        && !this.isAlreadyVisited(cellRight) 
        && !this.isStart(cellRight) 
        && !this.isBlock(cellRight);
  }

  isCellLeftAvailable(cellLeft: string): boolean{
    if (!this.instance.exist(cellLeft)) return false; 
    return this.gridBoundary.isPossibleToGoLeft(this.utils.cellIdToCellNumber(cellLeft)) 
        && !this.isAlreadyVisited(cellLeft) 
        && !this.isStart(cellLeft) 
        && !this.isBlock(cellLeft);
  }



  checkAvailableNeighbors(neighbor: Neighbor): Partial<Neighbor> {
    
    const available: Partial<Neighbor> = {};
    available.starterCell = neighbor.starterCell;

    if (this.isCellAboveAvailable(neighbor.above)) available.above = neighbor.above;
    if (this.isCellBelowAvailable(neighbor.below)) available.below = neighbor.below;
    if (this.isCellRightAvailable(neighbor.right)) available.right = neighbor.right;
    if (this.isCellLeftAvailable(neighbor.left)) available.left  = neighbor.left;

    return available;
  }

  async propagation(availableNeighbors: Partial<Neighbor>): Promise<void> {
    if (this.asyncController.signal.aborted) return;

    const { starterCell, ...neighbors } = availableNeighbors;
    
    await Promise.all(
      Object.values(neighbors).map(cellId => this.exploreFrom(cellId))
    );
  }
  
  visitCell(childCell: string, parentCell: string): void{
    this.pathTracer.add(childCell, parentCell)
    this.expandCell(childCell);
  }
  
  visitNeighbors(availableNeighbors: Partial<Neighbor>): void {
    const { starterCell, ...neighbors } = availableNeighbors;
    
    for (const cellId of Object.values(neighbors).filter(Boolean)) {
      this.visitCell(cellId, starterCell!);
    }
}


  async exploreFrom(targetCellId: string): Promise<void>{

      if (!targetCellId || this.asyncController.signal.aborted) return;
      await this.utils.sleep(150);
      const availableNeigbors = this.checkAvailableNeighbors(this.calculateNeighbors(targetCellId));
      this.visitNeighbors(availableNeigbors)
      if (this.asyncController.signal.aborted) return;
      await this.propagation(availableNeigbors);  
      
    }
  
  }

  /* 

  CalculateNeigbors
  CheckAvailability(CalculateNeighbors);
  VisitNeighbors()
  FindNeigbors -> Hace el calculo de cuales son los neighbors y devuelve un array
  CheckAvailableNeighbors -> Busca en el array de neighbors cuales puede visitar y borra los que no
  VisitNeighbors -> Visita los vecinos y empieza la expansion
  
  */