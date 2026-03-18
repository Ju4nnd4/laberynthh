import { Component } from '@angular/core';
import { CellService } from '../cell/cellService';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'app-starter-point-button',
  imports: [],
  templateUrl: './starter-point-button.html',
  styleUrl: './starter-point-button.scss',
})
export class StarterPointButton{

  constructor(private cService: CellService){}

  isSubscribed = false;
  sub!: Subscription;

  onClick(){
    if(this.isSubscribed){
      this.sub.unsubscribe()
      this.isSubscribed = false;      

    }
    else{
      this.sub = this.cService.isStarterPointMarked.subscribe(
        (marked: boolean) => {
          if (marked){
            console.log("hola")
          }
        }
      );
      this.isSubscribed = true;
      this.cService.isStarterPointMarked.next(true);
        }
    }
  }

