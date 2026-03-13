import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class CellService {
  private cells: {id: string, isActive: boolean}[] = [];
    setCells(cells: {id: string, isActive: boolean}[]) {
        this.cells = cells;
    }

    getCells() {
        return this.cells;
    }
}