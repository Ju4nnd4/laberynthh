import { Injectable, inject } from "@angular/core";
import { StorizedData } from "../storizedData";

export class GridExpansionLimitationService{

    cell!: number;
    data = inject(StorizedData);
    column = this.data.getColumnsQnty();

    setCell(cell: number): void{
        this.cell = cell;
    }
    
    checkExpansion(): boolean{
        if(this.checkUpMax() && this.checkRightMax() && this.checkDownMax() && this.checkLeftMax()){
            return true;
        }
        return false;
    }

    checkUpMax(): boolean{
        if(this.cell<1){
            return false;
        }
        return true;
    }

    checkDownMax(): boolean{
        if(this.cell> this.data.getColumnsQnty()* this.data.getRowsQnty()){
            return false;
        }
        return true;
    }

    checkLeftMax(): boolean{
        if((this.cell % this.data.getColumnsQnty()) - 1 == - 1){
            return false;
        }
        return true;
    }
    
    checkRightMax(): boolean{
        if((this.cell % this.data.getColumnsQnty()) + 1 == 1){
            return false;
        }
        return true;

    }
    
}