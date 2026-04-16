import { Component } from '@angular/core';
import { GenerateGrid } from "./generate-grid/generate-grid";

@Component({
  selector: 'app-screen',
  imports: [GenerateGrid],
  templateUrl: './screen.html',
  styleUrl: './screen.scss',
})
export class Screen {}
