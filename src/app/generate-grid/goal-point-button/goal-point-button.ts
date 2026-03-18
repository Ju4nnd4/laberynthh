import { Component } from '@angular/core';
import { CellService } from '../cell/cellService';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-goal-point-button',
  imports: [],
  templateUrl: './goal-point-button.html',
  styleUrl: './goal-point-button.scss',
})
export class GoalPointButton {
    constructor(private cService: CellService){}
  
    isSubscribed = false;
    sub!: Subscription;
  
    onClick(){
      if(this.isSubscribed){
        this.sub.unsubscribe();
        this.isSubscribed = false;      
        this.cService.isGoalPointMarked.next(false);
  
      }
      else{
        this.sub = this.cService.isGoalPointMarked.subscribe(
          (marked: boolean) => {
            if (marked){
              console.log("hola");
            }
          }
        );
        this.isSubscribed = true;
        this.cService.isGoalPointMarked.next(true);
          }
      }
}
