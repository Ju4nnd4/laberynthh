import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cell',
  imports: [],
  templateUrl: './cell.html',
  styleUrl: './cell.scss',
})
export class Cell {
  @Input() isActive: boolean = false;
  @Input() id: string = '';
  buttonText: string = this.id.toString();

  isStarterPoint: boolean = false;
  isGoal: boolean = false;


  starterActive = false;

  toggleCell(){
    this.isActive = !this.isActive;
  }
}
