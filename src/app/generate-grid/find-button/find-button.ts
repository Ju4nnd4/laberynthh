import { Component, inject } from '@angular/core';
import { ExpansionService } from '../cell/expansionService';
import { StorizedData } from '../storizedData';

@Component({
  selector: 'app-find-button',
  imports: [],
  templateUrl: './find-button.html',
  styleUrl: './find-button.scss',
})
export class FindButton {

  constructor(private expansionService: ExpansionService){}

  data = inject(StorizedData);

  onClick(){
    this.expansionService.djisktraFind(this.data.starterCellId);
  }
}
