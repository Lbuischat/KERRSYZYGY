import {
  Component,
  Output,
  EventEmitter
} from '@angular/core';

import { PlayerInfo } from './player-info/player-info';
import { CurrencyDisplay } from './currency-display/currency-display';
import { TaskPanel } from '../../tasks/task-panel/task-panel';
import { MiniMap } from './mini-map/mini-map';
import { ActionBar } from '../combat/action-bar/action-bar';
import { InventoryButton } from './inventory-button/inventory-button';
import { SettingsButton } from './settings-button/settings-button';

@Component({
  selector: 'app-hud',
  imports: [PlayerInfo, CurrencyDisplay, TaskPanel, MiniMap, ActionBar, InventoryButton, SettingsButton],
  templateUrl: './hud.html',
  styleUrl: './hud.css',
})
export class Hud {

  @Output() settingsOpen = new EventEmitter<void>();

  openSettings(): void {
    console.log('⚙️ HUD RECEIVED SETTINGS CLICK');

    this.settingsOpen.emit();
  }

}