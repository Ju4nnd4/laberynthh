import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export type ActiveButton = 'starter' | 'goal' | 'block' | null;

@Injectable({
  providedIn: 'root'
})
export class ButtonSwitchService {
  
  private activeButton = new BehaviorSubject<ActiveButton>(null);
  activeButton$ = this.activeButton.asObservable();

  toggle(button: ActiveButton): void {
    if (this.activeButton.getValue() === button) {
      this.activeButton.next(null);   // Si ya estaba activo, lo apaga
    } else {
      this.activeButton.next(button); // Si no, lo activa (y automáticamente desactiva el anterior)
    }
  }

  isActive(button: ActiveButton): boolean {
    return this.activeButton.getValue() === button;
  }

  deactivateAll(): void {
    this.activeButton.next(null);
  }
}