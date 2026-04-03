import { cellRegisterService } from "../../cell/cellRegisterService";
import { Utils } from "../../utils";
import { inject, Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})   
export class PathTracer{

    utils = new Utils();
    instance = inject(cellRegisterService);
    parentMap: Record<number, number> = {};

    add(cellSonId: string, cellParentId: string): void{
        this.parentMap[this.utils.cellIdToCellNumber(cellSonId)] = this.utils.cellIdToCellNumber(cellParentId);
    }
    
    async reconstructPath(goalCellId: string): Promise<number[]> {
        const path: number[] = [];
        let currentCellNumber = this.utils.cellIdToCellNumber(goalCellId);
        while (currentCellNumber !== undefined) {
        await this.utils.sleep(100);
            this.instance.cell(this.utils.cellNumberToCellId(currentCellNumber))!.toTracePath();
            path.unshift(currentCellNumber);
            currentCellNumber = this.parentMap[currentCellNumber];
        }
        return path;
    }
    
}