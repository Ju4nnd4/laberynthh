import { Component } from '@angular/core';
import { ExpansionService } from '../../../service/search/BFS/expansionService';
import { inject } from '@angular/core';
import { StorizedData } from '../../../service/dataStore';
import { Subscription } from 'rxjs';
import { CellService } from '../../../service/cell/cellService';

@Component({
  selector: 'app-obstacle-button',
  imports: [],
  templateUrl: './obstacle-button.html',
  styleUrl: './obstacle-button.scss',
})
export class ObstacleButton {

  constructor(private cService: CellService){}
    
  isSubscribed = false;
  sub!: Subscription;

  onClick(){
    if(this.isSubscribed){
      this.sub.unsubscribe();
      this.isSubscribed = false;      
      this.cService.isBlockButtonMarked.next(false);

    }
    else{
      this.sub = this.cService.isBlockButtonMarked.subscribe(
        (marked: boolean) => {
          if (marked){
            console.log("Block button marked");
          }
        }
      );
      this.isSubscribed = true;
      this.cService.isBlockButtonMarked.next(true);
        }
    }

}
