import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class CellService {
  isStarterPointMarked = new BehaviorSubject<boolean>(false);
  
}