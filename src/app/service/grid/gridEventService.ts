import { Injectable, signal} from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class GridEventService{
    showGrid = signal(false);

    toggleToShowGrid(){
        this.showGrid.update(v => !v);
    }

    getShowGrid(){
        return this.showGrid();
    }
}