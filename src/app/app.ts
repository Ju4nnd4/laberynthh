import { Component, signal, ElementRef, ViewChild, AfterViewInit, viewChild, ViewEncapsulation} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InputPanel } from './component/input-panel/input-panel';
import { LeftController } from "./component/left-controller/left-controller";
import { Screen } from "./component/screen/screen";
import { RightController } from './component/right-controller/right-controller';

@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None, 
  imports: [RouterOutlet, InputPanel, LeftController, Screen, RightController, InputPanel],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements AfterViewInit {
  protected readonly title = signal('laberynthh');


  ngAfterViewInit() {

  
  
  }
  
}
