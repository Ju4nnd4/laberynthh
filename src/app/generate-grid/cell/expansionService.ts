import { Expansion } from "@angular/compiler";
import { inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Inject } from "@angular/core";
import { StorizedData } from "../storizedData";

@Injectable({
  providedIn: 'root'
})

export class ExpansionService{
  
  data = inject(StorizedData);

  starterCell!: number;
  cellAbove!: number;
  cellBelow!: number;
  cellRight!: number;
  cellLeft!: number;
  //goalCellNumber: number = parseInt(this.goalCellId.replace("cell-", ""), 10);
  setVariablesForDjisktra(starterCellId: string): void{
    
    let starterPoint = parseInt(starterCellId.replace("cell-", ""), 10);
    this.cellAbove = starterPoint - this.data.getColumnsQnty();
    this.cellBelow = starterPoint + this.data.getColumnsQnty();
    this.cellRight = starterPoint + 1;
    this.cellLeft = starterPoint - 1;
    
  }

  djisktraFind(starterCellId: string): void{
    this.setVariablesForDjisktra(starterCellId);
    this.djisktraExpansion();
  }

  doCellExist(cell: number): boolean{
    if(cell<1 || cell > this.data.getColumnsQnty()*this.data.getRowsQnty()){
      return false;
    } else {
      return true;
    }

  }

  djisktraExpansion(){

    if(this.doCellExist(this.starterCell)){

      if(this.doCellExist(this.cellAbove)){
        console.log("Expandiendo hacia arriba " + this.cellAbove);
      }

      if(this.doCellExist(this.cellRight)){
        console.log("Expandiendo hacia derecha " + this.cellRight);
      }

      if(this.doCellExist(this.cellBelow)){
        console.log("Expandiendo hacia abajo " + this.cellBelow);
      }

      if(this.doCellExist(this.cellLeft)){
        console.log("Expandiendo hacia izquierda " + this.cellLeft);
      }
    }

  }

}