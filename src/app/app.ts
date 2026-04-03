import { Component, signal, ElementRef, ViewChild, AfterViewInit, viewChild, ViewEncapsulation} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InputPanel } from './component/input-panel/input-panel';
import { GridPanel } from "./component/grid-panel/grid-panel";


@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None, 
  imports: [RouterOutlet, InputPanel, GridPanel],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements AfterViewInit {
  protected readonly title = signal('laberynthh');


  ngAfterViewInit() {

  
  
  }
  
}
