import { Injectable, inject, OnDestroy } from "@angular/core";
import { CellStateService } from "./cell/cellStateService";
import { BfsMethod } from "./search/BFS/BFSMethod";
import { DataStore } from "./dataStore";

@Injectable({ providedIn: 'root' })
export class KeyboardShortcutService {
  
  private cellState = inject(CellStateService);
  private bfsMethod = inject(BfsMethod);
  private data = inject(DataStore);

  private listener = (event: KeyboardEvent) => {
    switch (event.key) {
      case '1': this.triggerFind(); break;
      case '2': this.toggleStarter(); break;
      case '3': this.toggleGoal(); break;
      case '4': this.toggleBlock(); break;
    }
  };

  register() {
    window.addEventListener('keydown', this.listener);
  }

  unregister() {
    window.removeEventListener('keydown', this.listener);
  }

  private triggerFind() {
    this.bfsMethod.search(this.data.starterCellId);
  }

  private toggleStarter() {
    const current = this.cellState.isStarterPointMarked.getValue();
    this.cellState.isStarterPointMarked.next(!current);
  }

  private toggleGoal() {
    const current = this.cellState.isGoalPointMarked.getValue();
    this.cellState.isGoalPointMarked.next(!current);
  }

  private toggleBlock() {
    const current = this.cellState.isBlockButtonMarked.getValue();
    this.cellState.isBlockButtonMarked.next(!current);
  }
}