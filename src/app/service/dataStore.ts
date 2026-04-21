import { Injectable } from "@angular/core";
import { CellModel } from "../model/cellModel";
@Injectable({
  providedIn: 'root'
})

export class DataStore{

    columnsQnty: number = 10;
    rowsQnty: number = 10;
    starterCellId!: string;
    goalCellId!: string;
    

    bunchOfCells: CellModel[] = [];

    resetBunchOfCells(): void{
        this.bunchOfCells = [];
    }

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

    isGoalCellSet(): boolean{
        return !!this.goalCellId;
    }

    resetGoalCell(): void{
        this.goalCellId = '';
    }

}