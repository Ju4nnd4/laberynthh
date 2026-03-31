import { Injectable, inject } from "@angular/core";
import { StorizedData } from "../dataStore";

@Injectable({
  providedIn: 'root'
})


export class GridExpansionLimitationService{

    cell!: number;
    data = inject(StorizedData);
    column = this.data.getColumnsQnty();
    

    isPossibleToGoAbove(node: number): boolean{
        if(node<1){
            return false;
        }
        return true;
    }

    isPossibleToGoDown(node: number): boolean{
        if(node > this.data.getColumnsQnty()* this.data.getRowsQnty()){
            return false;
        }
        return true;
    }

    isPossibleToGoLeft(node: number): boolean{
        if((node % this.data.getColumnsQnty()) - 1 == -1){
            return false;
        }
        return true;
    }
    
    isPossibleToGoRight(node: number): boolean{
        if((node % this.data.getColumnsQnty()) + 1 == 1){
            return false;
        }
        return true;
    }
    
}