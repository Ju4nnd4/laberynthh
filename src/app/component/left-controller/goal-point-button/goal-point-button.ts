import { Component, OnInit, OnDestroy } from '@angular/core';
import { ButtonSwitchService } from '../../../service/button/buttonSwitchService';
import { CellStateService } from '../../../service/cell/cellStateService';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-goal-point-button',
  imports: [],
  templateUrl: './goal-point-button.html',
  styleUrl: './goal-point-button.scss',
})
export class GoalPointButton implements OnInit, OnDestroy {

  constructor(
    private buttonSwitch: ButtonSwitchService,
    private store: CellStateService
  ) {}

  isSubscribed = false;
  private sub!: Subscription;

  ngOnInit() {
    this.sub = this.buttonSwitch.activeButton$.subscribe(active => {
      this.isSubscribed = active === 'goal';
      this.store.isGoalPointMarked.next(this.isSubscribed);
    });
  }

  ngOnDestroy() { this.sub.unsubscribe(); }

  onClick() { this.buttonSwitch.toggle('goal'); }
}