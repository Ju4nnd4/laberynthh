import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { CellStateService } from '../../../service/cell/cellStateService';

@Component({
  selector: 'app-obstacle-button',
  imports: [],
  templateUrl: './obstacle-button.html',
  styleUrl: './obstacle-button.scss',
})
export class ObstacleButton {

  constructor(private store: CellStateService){}
    
  isSubscribed = false;
  sub!: Subscription;

  onClick(){
    if(this.isSubscribed){
      this.sub.unsubscribe();
      this.isSubscribed = false;      
      this.store.isBlockButtonMarked.next(false);

    }
    else{
      this.sub = this.store.isBlockButtonMarked.subscribe(
        (marked: boolean) => {
          if (marked){
            console.log("Block button marked");
          }
        }
      );
      this.isSubscribed = true;
      this.store.isBlockButtonMarked.next(true);
        }
    }

}
