import { Component, inject } from '@angular/core';
import { ExpansionService } from '../../../service/search/BFS/expansionService';
import { StorizedData } from '../../../service/dataStore';

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
