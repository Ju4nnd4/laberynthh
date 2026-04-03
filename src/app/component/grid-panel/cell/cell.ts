import { Component, Input, OnDestroy, OnInit, inject} from '@angular/core';
import { CellStateService } from '../../../service/cell/cellStateService';
import { cellService } from '../../../service/cell/cellService';
import { cellRegisterService } from '../../../service/cell/cellRegisterService';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-cell',
  imports: [],
  templateUrl: './cell.html',
  styleUrl: './cell.scss',
})
export class Cell implements OnInit, OnDestroy {
  @Input() id: string = '';
  isStart: boolean = false;
  isGoal: boolean = false;
  isNeighbor: boolean = false;
  isPath: boolean = false;
  isBlock: boolean = false;
  
  constructor(
    private cellState: CellStateService, 
    private registerInstance: cellRegisterService, 
    private service: cellService,
    private detectChanges: ChangeDetectorRef ){}
  
  ngOnInit() {
    this.registerInstance.register(this.id, this);
    
    this.cellState.starterCellOnChangeSubscription.subscribe(id => {
      this.isStart = id == this.id
    })
    this.cellState.goalCellOnChangeSubscription.subscribe(id => {
      this.isGoal = id == this.id
    })
    
  }

  ngOnDestroy() { this.registerInstance.delete(this.id);  }

  toggleCell(){ this.service.handleCellStatesByClickOnCell(this.id) ;}

  toNeighbor(){ this.isNeighbor = !this.isNeighbor; this.detectChanges.detectChanges();}
  
  toBlock(){ this.isBlock = !this.isBlock; this.detectChanges.detectChanges();}

  toPath(){ this.isPath = !this.isPath; this.detectChanges.detectChanges(); }

  toStart(){ this.detectChanges.detectChanges(); }

  toGoal(){ this.detectChanges.detectChanges(); }

}

