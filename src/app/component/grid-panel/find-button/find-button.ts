import { Component, inject } from '@angular/core';
import { BFSSearch } from '../../../service/search/BFS/expansionService';
import { DataStore } from '../../../service/dataStore';

@Component({
  selector: 'app-find-button',
  imports: [],
  templateUrl: './find-button.html',
  styleUrl: './find-button.scss',
})
export class FindButton {

  constructor(private BFSSearch: BFSSearch){}

  data = inject(DataStore);

  onClick(){
    this.BFSSearch.djisktraFind(this.data.starterCellId);
  }
}
