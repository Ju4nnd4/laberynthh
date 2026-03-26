import { inject, Injectable, Renderer2, Inject } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { StorizedData } from "../storizedData";
import { GridExpansionLimitationService } from "./gridExpansionLimitationService";
import { StarterPointButton } from "../starter-point-button/starter-point-button";

@Injectable({
  providedIn: 'root'
})

export class ExpansionService{
  
  data = inject(StorizedData);
  rService = inject(GridExpansionLimitationService);
  visited = new Set<number>();

  starterCell!: number;
  cellAbove!: number;
  cellBelow!: number;
  cellRight!: number;
  cellLeft!: number;
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
  
  expandCell(targetCell: number){
    const cell = document.getElementById("cell-" + targetCell);
    cell!.classList.add("walked");
    let isNeighbor = new BehaviorSubject<boolean>(true);


  }

  async djisktraExpansion(targetCell: number){

    if (!targetCell || this.visited.has(targetCell)) return;
    this.visited.add(targetCell);

    await this.sleep(100);
    
    this.setVariablesForDjisktra(targetCell);
    
    let isCellAboveAvailable: boolean = this.rService.isPossibleToGoAbove(this.cellAbove);
    let isCellBelowAvailable: boolean = this.rService.isPossibleToGoDown(this.cellBelow);
    // FIX ME: isPossibleToGoRight the only way it works is taking evaluating
    let isCellRightAvailable: boolean = this.rService.isPossibleToGoRight(targetCell);
    let isCellLeftAvailable: boolean = this.rService.isPossibleToGoLeft(this.cellLeft);
    
    if (isCellAboveAvailable)   this.expandCell(this.cellAbove);
    if (isCellBelowAvailable)   this.expandCell(this.cellBelow);
    if (isCellRightAvailable)   this.expandCell(this.cellRight);
    if (isCellLeftAvailable)    this.expandCell(this.cellLeft);

    if (isCellAboveAvailable)   this.djisktraExpansion(this.cellAbove);
    if (isCellBelowAvailable)   this.djisktraExpansion(this.cellBelow);
    if (isCellRightAvailable)   this.djisktraExpansion(this.cellRight);
    if (isCellLeftAvailable)    this.djisktraExpansion(this.cellLeft);
  }

  sleep(ms: number){
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}