import { Injectable } from "@angular/core";
import { Cell } from "../../component/screen/cell/cell";
import { Utils } from "../utils";

@Injectable({
    providedIn: 'root'
})

export class cellRegisterService{
    private instance = new Map<string, Cell>();
    utils = new Utils();

    register(id: string, instance: Cell){
        this.instance.set(id, instance);
    }

    get(id: string): Cell | undefined {
        return this.instance.get(id);
    }

    delete(id: string){
        this.instance.delete(id);
    }

    cell(id: string){
        return this.instance.get(id);
    }

    exist(id: string):  boolean{
        if(this.instance.get(id) == undefined){
            return false;
        } else{
            return true;
        }
    }

    clear(){
        this.instance.clear();
    }

    resetAllCells(): void {
        this.instance.forEach(cell => cell.resetState());
    }

}