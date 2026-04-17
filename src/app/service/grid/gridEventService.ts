import { inject, Injectable, signal} from "@angular/core";
import { DataStore } from "../dataStore";
import { cellRegisterService } from "../cell/cellRegisterService";
@Injectable({
  providedIn: 'root'
})

export class GridEventService{
    showGrid = signal(false);
    data = inject(DataStore);
    instance = inject(cellRegisterService);

    toggleToShowGrid(){
        this.showGrid.update(v => !v);
    }

    getShowGrid(){
        return this.showGrid();
    }

    resetGrid(){
        this.data.resetBunchOfCells();
        this.instance.clear();
    }

    generateGrid() {
        this.resetGrid();

    
        const total = this.data.getRowsQnty() * this.data.getColumnsQnty();
        this.data.bunchOfCells = Array.from({ length: total }, (_, i) => ({
        id: `cell-${i+1}`,
        isStart: false,
        isGoal: false,
        isBlock: false,
        isPath: false
        
        }));
     
  }
}