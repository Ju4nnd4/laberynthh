import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class CellStateService {
  isStarterPointMarked = new BehaviorSubject<boolean>(false);
  isGoalPointMarked = new BehaviorSubject<boolean>(false);
  isBlockButtonMarked = new BehaviorSubject<boolean>(false);
  starterCellOnChangeSubscription = new BehaviorSubject<string|null>(null);
  goalCellOnChangeSubscription = new BehaviorSubject<string|null>(null);
  
  isNeighbor = new BehaviorSubject<boolean>(false);
  isPainting = false;
  paintingIntent: 'block' | 'unblock' | null = null; 

}