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
    const starterCell = parseInt(starterCellId.replace("cell-", ""), 10);
    this.djisktraExpansion(starterCell);
  }
  
  expandCell(targetCell: number){
    const cell = document.getElementById("cell-" + targetCell);
    cell!.classList.add("walked");
    console.log(cell);
  }

  async djisktraExpansion(targetCell: number){
    
    this.setVariablesForDjisktra(targetCell);
    
    let isStarterCellAvailable: boolean = this.rService.isPossibleToExpandToThisCell(this.starterCell);
    let isCellAboveAvailable: boolean = this.rService.isPossibleToExpandToThisCell(this.cellAbove);
    let isCellBelowAvailable: boolean = this.rService.isPossibleToExpandToThisCell(this.cellBelow);
    let isCellLeftAvailable = this.rService.isPossibleToExpandToThisCell(this.cellLeft);
    let isCellRightAvailable = this.rService.isPossibleToExpandToThisCell(this.cellRight);
    await this.sleep(100);
    
    if(isStarterCellAvailable){
      this.expandCell(this.starterCell)
    }
    if(isCellAboveAvailable){
      this.expandCell(this.cellAbove)
    }
    if(isCellLeftAvailable){
      this.expandCell(this.cellLeft)
    }
    if(isCellBelowAvailable){
      this.expandCell(this.cellBelow)
    }
    if(isCellRightAvailable){
      this.expandCell(this.cellRight)
    }
    
    while(isStarterCellAvailable || isCellAboveAvailable || isCellRightAvailable || isCellBelowAvailable || isCellLeftAvailable){
      
      if(isStarterCellAvailable){
        this.djisktraExpansion(this.starterCell)
        isStarterCellAvailable = false;

      }
      if(isCellAboveAvailable){
        this.djisktraExpansion(this.cellAbove)
        isCellAboveAvailable = false;
      }
      if(isCellLeftAvailable){
        this.djisktraExpansion(this.cellLeft)
        isCellLeftAvailable = false;
      }
      if(isCellBelowAvailable){
        this.djisktraExpansion(this.cellBelow)
        isCellBelowAvailable = false;
      }
      if(isCellRightAvailable){
        this.djisktraExpansion(this.cellRight)
        isCellRightAvailable = false;
      }
    }


  }

  sleep(ms: number){
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}