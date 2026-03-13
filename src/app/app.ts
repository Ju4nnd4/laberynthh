import { Component, signal, ElementRef, ViewChild, AfterViewInit, viewChild, ViewEncapsulation} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InputRowColumn } from './input-row-column/input-row-column';


@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None, 
  imports: [InputRowColumn, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements AfterViewInit {
  protected readonly title = signal('laberynthh');

  @ViewChild('inputSection') inputSection!: ElementRef;
  @ViewChild('gridContainer') gridSection!: ElementRef;


  ngAfterViewInit() {
  }
  
  
  
  
}
