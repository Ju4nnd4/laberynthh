import { Injectable } from "@angular/core";
import { Cell } from "../../component/grid-panel/cell/cell";

@Injectable({
    providedIn: 'root'
})

export class cellRegisterService{
    private instance = new Map<string, Cell>();

    register(id: string, instance: Cell){
        this.instance.set(id, instance);
        console.log("Id registrado:" + id);
    }

    

    get(id: string): Cell | undefined {
        return this.instance.get(id);
    }

    delete(id: string){
        this.instance.delete(id);
    }



}