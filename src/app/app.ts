import { Component, signal, ElementRef, ViewChild, AfterViewInit, viewChild, ViewEncapsulation} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LeftController } from "./component/left-controller/left-controller";
import { Screen } from "./component/screen/screen";
import { RightController } from './component/right-controller/right-controller';
import { KeyboardShortcutService } from './service/keyboardService';
import { inject } from '@angular/core';
import { CellStateService } from './service/cell/cellStateService';

@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None, 
  imports: [RouterOutlet, LeftController, Screen, RightController],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements AfterViewInit {
  protected readonly title = signal('laberynthh');
  private shortcuts = inject(KeyboardShortcutService);
  private cellState = inject(CellStateService);


  ngAfterViewInit() {
    this.shortcuts.register();
    window.addEventListener('mouseup', () => {
    this.cellState.isPainting = false;
     });
    }
  
}
