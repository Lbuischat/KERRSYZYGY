import { Component, EventEmitter, Output } from '@angular/core';
import { GameSettingsService } from './settings.service';

@Component({
  imports: [],
  selector: 'app-settings',
  styleUrl: './settings.css',
  templateUrl: './settings.html',
})
export class Settings {

  @Output() closeSettings = new EventEmitter<void>();

  constructor(public settings: GameSettingsService) {}

  activeTab = 'gpt';

  selectTab(tab: string): void {
    this.activeTab = tab;
  }

  updateSliderProgress(event: Event): void {
    const slider = event.target as HTMLInputElement;

    const min = Number(slider.min);
    const max = Number(slider.max);
    const value = Number(slider.value);

    const progress = ((value - min) / (max - min)) * 100;

    slider.style.setProperty(
      '--slider-progress',
      `${progress}%`
    );
  }
}