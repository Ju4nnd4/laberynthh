import { DataStore } from "../dataStore";
import { CellStateService } from "./cellStateService";
import { inject, Injectable } from "@angular/core";
import { cellRegisterService } from "./cellRegisterService";

@Injectable({ providedIn: "root"})
export class cellService{
    
    id!: string;
    data = inject(DataStore);
    cellState = inject(CellStateService);
    instance = inject(cellRegisterService);

    handleCellStatesByClickOnCell(cellId: string){
        const cell = this.instance.get(cellId);
        if(this.cellState.isBlockButtonMarked.getValue()) cell!.toBlock();

        else if(this.cellState.isGoalPointMarked.getValue()) {
            this.cellState.goalCellOnChangeSubscription.next(cellId);
            this.data.setGoalCell(cellId);
        }

        else if(this.cellState.isStarterPointMarked.getValue()) {
            this.cellState.starterCellOnChangeSubscription.next(cellId);
            this.data.setStarterCell(cellId);
        }

    }

    handleCellPaintOnDrag(cellId: string){
        const cell = this.instance.get(cellId);

    
        /*

        if(this.cellState.isBlockButtonMarked.getValue() && !cell!.isBlock) {
            cell!.toBlock();
        }   
        
        */
    }

    handleCellPaintWithIntent(cellId: string, intent: 'block' | 'unblock'){
        const cell = this.instance.get(cellId);
        if (intent === 'block' && !cell!.isBlock) cell!.toBlock();
        if (intent === 'unblock' && cell!.isBlock) cell!.toBlock();
        }
}