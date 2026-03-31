import { Component } from '@angular/core';
import { InputRowColumn } from "./input-row-column/input-row-column";

@Component({
  selector: 'app-input-panel',
  imports: [InputRowColumn],
  templateUrl: './input-panel.html',
  styleUrl: './input-panel.scss',
})
export class InputPanel {}
