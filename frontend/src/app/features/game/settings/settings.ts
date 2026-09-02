import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { GameSettingsService } from './settings.service';

type SettingsSection = 'gameplay' | 'sound' | 'accessibility';

@Component({
  imports: [],
  selector: 'app-settings',
  styleUrl: './settings.css',
  templateUrl: './settings.html',
})
export class Settings {

  activeSection: SettingsSection = 'gameplay';

  constructor(
    public settings: GameSettingsService,
    private router: Router,
  ) { }

  selectSection(section: SettingsSection): void {
    this.activeSection = section;
  }

  goBack(): void {
    this.router.navigate(['/game']);
  }

  getDifficultyStarClass(index: number): string {
    const litCount = Math.ceil(
      this.settings.difficulty / 2
    );

    return index < litCount ? 'lit' : '';
  }
}