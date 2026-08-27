import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-settings-button',
  imports: [],
  templateUrl: './settings-button.html',
  styleUrl: './settings-button.css',
})
export class SettingsButton {

  @Output() settingsClicked = new EventEmitter<void>();

  openSettings(): void {
    console.log('⚙️ SETTINGS BUTTON CLICKED');

    this.settingsClicked.emit();
  }

}