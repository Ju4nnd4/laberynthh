import { Component } from '@angular/core';
import { GenerateGrid } from "./generate-grid/generate-grid";
import { StarterPointButton } from "./starter-point-button/starter-point-button";
import { GoalPointButton } from "./goal-point-button/goal-point-button";
import { ObstacleButton } from "./obstacle-button/obstacle-button";
import { FindButton } from "./find-button/find-button";

@Component({
  selector: 'app-grid-panel',
  imports: [GenerateGrid, StarterPointButton, GoalPointButton, ObstacleButton, FindButton],
  templateUrl: './grid-panel.html',
  styleUrl: './grid-panel.scss',
})
export class GridPanel {
  
}
