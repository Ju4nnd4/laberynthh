import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class CellService {
  isStarterPointMarked = new BehaviorSubject<boolean>(false);
  isGoalPointMarked = new BehaviorSubject<boolean>(false);
  starterPointCellId = new BehaviorSubject<string|null>(null);
  goalPointCellId = new BehaviorSubject<string|null>(null);


}