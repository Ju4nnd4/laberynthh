import { Injectable, inject } from '@angular/core';
import { DataStore } from './dataStore';
import { CellStateService } from './cell/cellStateService';
import { cellRegisterService } from './cell/cellRegisterService';
import { PathTracer } from './search/BFS/PathTracer';

@Injectable({ providedIn: 'root' })
export class ResetService {
  data = inject(DataStore);
  cellState = inject(CellStateService);
  register = inject(cellRegisterService);
  pathTracer = inject(PathTracer);

  reset(): void {
    // Limpiar DataStore
    this.data.starterCellId = null!;
    this.data.goalCellId = null!;

    // Limpiar CellStateService
    this.cellState.isStarterPointMarked.next(false);
    this.cellState.isGoalPointMarked.next(false);
    this.cellState.isBlockButtonMarked.next(false);
    this.cellState.starterCellOnChangeSubscription.next(null);
    this.cellState.goalCellOnChangeSubscription.next(null);

    // Limpiar registro de instancias
    this.register.clear();

    // Limpiar PathTracer
    this.pathTracer.parentMap = {};

    // Resetear BFS
  }
}