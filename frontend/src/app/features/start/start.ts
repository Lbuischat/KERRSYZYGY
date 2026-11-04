
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { PlayerService } from '../../services/player.service';
import { LanguageService } from '../../services/language/language.service';

interface BackgroundStar {
  left: number;
  top: number;
  size: number;
  opacity: number;
}

interface CelestialEvent {
  id: number;
  type: 'comet' | 'meteor';
  left: number;
  top: number;
  duration: number;
  delay: number;
}

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './start.html',
  styleUrl: './start.css'
})
export class Start {
  backgroundStars: BackgroundStar[] = [];
  celestialEvents: CelestialEvent[] = [];

  readonly months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  readonly genderOptions = [
    'Female',
    'Male',
    'Non-binary',
    'Other'
  ];

  readonly pronounOptions = [
    'She / Her',
    'He / Him',
    'They / Them',
    'It / Its'
  ];

  readonly days = Array.from(
    { length: 31 },
    (_, i) => i + 1
  );

  readonly years = Array.from(
    { length: 100 },
    (_, i) => new Date().getFullYear() - i
  );

  selectedMonth = '';
  selectedDay: number | null = null;
  selectedYear: number | null = null;

  etapa = 0;

  constructor(
    public playerService: PlayerService,
    private router: Router,
    public readonly languageService: LanguageService
  ) {
    this.createBackgroundStars();
    this.createCelestialEvents();
    this.restoreBirthdaySelections();
  }

  // =========================================
  // BACKGROUND
  // =========================================

  private createBackgroundStars(): void {
    for (let i = 0; i < 180; i++) {
      this.backgroundStars.push({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() < 0.9 ? 1 : 2,
        opacity: 0.08 + Math.random() * 0.17
      });
    }
  }

  private createCelestialEvents(): void {
    for (let i = 0; i < 5; i++) {
      this.celestialEvents.push({
        id: i,
        type: Math.random() < 0.5
          ? 'comet'
          : 'meteor',
        left: Math.random() * 100,
        top: Math.random() * 70,
        duration: 2 + Math.random() * 3,
        delay: Math.random() * 8
      });
    }
  }

  // =========================================
  // STAGES
  // =========================================

  continue(): void {
    this.goToNextStage();
  }

  private goToNextStage(): void {
    if (this.etapa < 5) {
      this.etapa++;
    }
  }

  // =========================================
  // GENDER
  // =========================================

  selectGender(gender: string): void {
    this.playerService.profile.gender = gender;
    this.playerService.saveProfile();
  }

  continueAfterGender(): void {
    if (!this.playerService.profile.gender) {
      return;
    }

    this.goToNextStage();
  }

  // =========================================
  // USERNAME
  // =========================================

  selectUsername(): void {
    const name =
      this.playerService.profile.username.trim();

    if (!name) return;

    this.playerService.profile.username = name;
    this.playerService.saveProfile();

    this.goToNextStage();
  }

  // =========================================
  // PRONOUNS
  // =========================================

  selectPronouns(pronouns: string): void {
    this.playerService.profile.pronouns = pronouns;
    this.playerService.saveProfile();
  }

  continueAfterPronouns(): void {
    if (!this.playerService.profile.pronouns) {
      return;
    }

    this.goToNextStage();
  }

  // =========================================
  // BIRTHDAY
  // =========================================

  selectBirthday(
    type: 'month' | 'day' | 'year',
    value: string | number
  ): void {
    if (type === 'month') {
      this.selectedMonth = String(value);
    }

    if (type === 'day') {
      this.selectedDay = Number(value) || null;
    }

    if (type === 'year') {
      this.selectedYear = Number(value) || null;
    }

    this.clampSelectedDay();
    this.updateBirthday();
  }

  get availableDays(): number[] {
    if (!this.selectedMonth) {
      return this.days;
    }

    const month =
      this.months.indexOf(this.selectedMonth) + 1;

    if (!month) {
      return this.days;
    }

    const year =
      this.selectedYear ?? new Date().getFullYear();

    const count =
      new Date(year, month, 0).getDate();

    return Array.from(
      { length: count },
      (_, i) => i + 1
    );
  }

  private clampSelectedDay(): void {
    if (
      this.selectedDay !== null &&
      this.selectedDay > this.availableDays.length
    ) {
      this.selectedDay = null;
    }
  }

  private updateBirthday(): void {
    const month =
      this.months.indexOf(this.selectedMonth) + 1;

    const day = this.selectedDay;
    const year = this.selectedYear;

    if (
      !month ||
      !day ||
      !year ||
      !this.validDate(year, month, day)
    ) {
      this.playerService.profile.birthday = '';
      this.playerService.saveProfile();
      return;
    }

    this.playerService.profile.birthday =
      `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    this.playerService.saveProfile();
  }

  private validDate(
    year: number,
    month: number,
    day: number
  ): boolean {
    const date = new Date(
      year,
      month - 1,
      day
    );

    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    );
  }

  continueAfterBirthday(): void {
    if (!this.playerService.profile.birthday) {
      return;
    }

    this.playerService.saveProfile();
    this.goToNextStage();
  }

  private restoreBirthdaySelections(): void {
    const birthday =
      this.playerService.profile.birthday;

    if (!birthday) return;

    const match =
      /^(\d{4})-(\d{2})-(\d{2})$/.exec(birthday);

    if (!match) return;

    const [, y, m, d] = match;

    const year = Number(y);
    const month = Number(m);
    const day = Number(d);

    if (!this.validDate(year, month, day)) {
      return;
    }

    this.selectedYear = year;
    this.selectedMonth = this.months[month - 1];
    this.selectedDay = day;
  }

  // =========================================
  // START → PERFIL
  // =========================================

  startJourney(): void {
    this.playerService.saveProfile();

    void this.router.navigate(
      ['/playerinfo'],
      {
        queryParams: {
          setup: '1'
        }
      }
    );
  }
}
