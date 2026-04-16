import { Component, inject } from '@angular/core';
import { BfsMethod } from '../../../service/search/BFS/BFSMethod';
import { DataStore } from '../../../service/dataStore';

@Component({
  selector: 'app-find-button',
  imports: [],
  templateUrl: './find-button.html',
  styleUrl: './find-button.scss',
})
export class FindButton {

  constructor(private BfsMethod: BfsMethod){}

  data = inject(DataStore);

  onClick(){
    this.BfsMethod.search(this.data.starterCellId);
  }
}
