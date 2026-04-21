import { Component, OnInit, OnDestroy } from '@angular/core';
import { ButtonSwitchService } from '../../../service/button/buttonSwitchService';
import { CellStateService } from '../../../service/cell/cellStateService';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-starter-point-button',
  imports: [],
  templateUrl: './starter-point-button.html',
  styleUrl: './starter-point-button.scss',
})
export class StarterPointButton implements OnInit, OnDestroy {

  constructor(
    private buttonSwitch: ButtonSwitchService,
    private store: CellStateService
  ) {}

  isSubscribed = false;
  private sub!: Subscription;

  ngOnInit() {
    this.sub = this.buttonSwitch.activeButton$.subscribe(active => {
      this.isSubscribed = active === 'starter';
      this.store.isStarterPointMarked.next(this.isSubscribed);
    });
  }

  ngOnDestroy() { this.sub.unsubscribe(); }

  onClick() { this.buttonSwitch.toggle('starter'); }
}