import { Component } from '@angular/core';
import { FindButton } from "./find-button/find-button";
import { GoalPointButton } from "./goal-point-button/goal-point-button";
import { ObstacleButton } from "./obstacle-button/obstacle-button";
import { StarterPointButton } from "./starter-point-button/starter-point-button";
import { GridButton } from "./grid-button/grid-button";

@Component({
  selector: 'app-left-controller',
  imports: [FindButton, GoalPointButton, ObstacleButton, StarterPointButton, GridButton],
  templateUrl: './left-controller.html',
  styleUrl: './left-controller.scss',
})
export class LeftController {

}
