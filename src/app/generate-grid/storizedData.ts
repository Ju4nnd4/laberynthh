import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class StorizedData{

    columnsQnty!: number;
    rowsQnty!: number;
    starterCellId!: string;
    goalCellId!: string;

    setColumnsQnty(columnsQuantityByInput: number): void{
        this.columnsQnty = columnsQuantityByInput;
    }

    getColumnsQnty(): number{
        return this.columnsQnty;
    }

    setRowsQnty(rowsQuantityByInput: number): void{
        this.rowsQnty = rowsQuantityByInput;
    }

    getRowsQnty(): number{
        return this.rowsQnty;
    }

    setStarterCell(starterCellId: string): void{
        this.starterCellId = starterCellId
    }

    getStarterCell():string{
        return this.starterCellId;
    }

    setGoalCell(goalCellId: string): void{
        this.goalCellId = goalCellId;
    }

    getgoalCell(): string{
        return this.goalCellId;
    }

}