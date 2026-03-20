import { Expansion } from "@angular/compiler";
import { inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Inject } from "@angular/core";
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
  setVariablesForDjisktra(starterCellId: string): void{
    
    this.starterCell = parseInt(starterCellId.replace("cell-", ""), 10);
    this.cellAbove = this.starterCell - this.data.getColumnsQnty();
    this.cellBelow = this.starterCell + this.data.getColumnsQnty();
    this.cellRight = this.starterCell + 1;
    this.cellLeft = this.starterCell - 1;
    
  }

  djisktraFind(starterCellId: string): void{
    this.setVariablesForDjisktra(starterCellId);
    this.djisktraExpansion();
  }

  djisktraExpansion(){
    
  }
}