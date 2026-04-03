import { Component } from '@angular/core';
import { CellStateService } from '../../../service/cell/cellStateService';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-goal-point-button',
  imports: [],
  templateUrl: './goal-point-button.html',
  styleUrl: './goal-point-button.scss',
})
export class GoalPointButton {
    constructor(private store: CellStateService){}
  
    isSubscribed = false;
    sub!: Subscription;
  
    onClick(){
      if(this.isSubscribed){
        this.sub.unsubscribe();
        this.isSubscribed = false;      
        this.store.isGoalPointMarked.next(false);
  
      }
      else{
        this.sub = this.store.isGoalPointMarked.subscribe(
          (marked: boolean) => {
            if (marked){
              console.log("hola");
            }
          }
        );
        this.isSubscribed = true;
        this.store.isGoalPointMarked.next(true);
          }
      }
}
