import { Injectable } from "@angular/core";
import { signal } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class ScreenChanger {
    inputRowColumnScreen = signal(false);
    gridScreen = signal(true);
    mazeScreen = signal(false);

    changeScreen(screen: string) {
        this.inputRowColumnScreen.set(screen === 'inputRowColumnScreen');
        this.gridScreen.set(screen === 'gridScreen');
        this.mazeScreen.set(screen === 'mazeScreen');
    }
}
