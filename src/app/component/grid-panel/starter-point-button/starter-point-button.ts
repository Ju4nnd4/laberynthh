import { Component } from '@angular/core';
import { CellStateService } from '../../../service/cell/cellStateService';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'app-starter-point-button',
  imports: [],
  templateUrl: './starter-point-button.html',
  styleUrl: './starter-point-button.scss',
})
export class StarterPointButton{

  constructor(private store: CellStateService){}

  isSubscribed = false;
  sub!: Subscription;

  onClick(){
    if(this.isSubscribed){
      this.sub.unsubscribe();
      this.isSubscribed = false;      
      this.store.isStarterPointMarked.next(false);

    }
    else{
      this.sub = this.store.isStarterPointMarked.subscribe(
        (marked: boolean) => {
          if (marked){
            console.log("hola");
          }
        }
      );
      this.isSubscribed = true;
      this.store.isStarterPointMarked.next(true);
        }
    }
  }

