import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
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
  imports: [FormsModule],
  templateUrl: './start.html',
  styleUrl: './start.css',
})
export class Start {
  @ViewChildren('stageSection', { read: ElementRef })
  private stageSections!: QueryList<ElementRef<HTMLElement>>;

  // Background
  readonly backgroundStars: BackgroundStar[] = Array.from({ length: 180 }, () => ({
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() < 0.9 ? 1 : 2,
    opacity: 0.08 + Math.random() * 0.17,
  }));

  readonly celestialEvents: CelestialEvent[] = Array.from({ length: 5 }, (_, id) => ({
    id,
    type: Math.random() < 0.5 ? 'comet' : 'meteor',
    left: Math.random() * 100,
    top: Math.random() * 70,
    duration: 2 + Math.random() * 3,
    delay: Math.random() * 8,
  }));

  // Options
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
    'December',
  ];

  readonly genderOptions = ['Female', 'Male', 'Non-binary', 'Other'];

  readonly pronounOptions = ['She / Her', 'He / Him', 'They / Them', 'It / Its'];

  readonly days = Array.from({ length: 31 }, (_, index) => index + 1);

  readonly years = Array.from({ length: 100 }, (_, index) => new Date().getFullYear() - index);

  // Birthday selections
  selectedMonth = '';
  selectedDay: number | null = null;
  selectedYear: number | null = null;

  // Current stage: 0 through 4
  etapa = 0;

  constructor(
    public playerService: PlayerService,
    private router: Router,
    public readonly languageService: LanguageService,
  ) {
    this.restoreBirthdaySelections();
  }

  // Navigation

  continue(): void {
    if (this.etapa === 0) {
      this.goToNextStage();
    }
  }

  private goToNextStage(): void {
    if (this.etapa >= 4) {
      return;
    }

    this.etapa++;

    requestAnimationFrame(() => {
      const nextSection = this.stageSections.get(this.etapa);

      nextSection?.nativeElement.scrollIntoView({
        behavior: window.matchMedia(
          '(prefers-reduced-motion: reduce)',
        ).matches
          ? 'auto'
          : 'smooth',
        block: 'start',
      });
    });
  }

  // Gender

  selectGender(gender: string): void {
    if (this.etapa !== 1) {
      return;
    }

    this.playerService.profile.gender = gender;
    this.playerService.saveProfile();
  }

  continueAfterGender(): void {
    if (this.etapa !== 1 || !this.playerService.profile.gender) {
      return;
    }

    this.goToNextStage();
  }

  // Username

  selectUsername(): void {
    if (this.etapa !== 2) {
      return;
    }

    const username = this.playerService.profile.username.trim();

    if (!username) {
      return;
    }

    this.playerService.profile.username = username;
    this.playerService.saveProfile();

    this.goToNextStage();
  }

  // Pronouns

  selectPronouns(pronouns: string): void {
    if (this.etapa !== 3) {
      return;
    }

    this.playerService.profile.pronouns = pronouns;
    this.playerService.saveProfile();
  }

  continueAfterPronouns(): void {
    if (this.etapa !== 3 || !this.playerService.profile.pronouns) {
      return;
    }

    this.goToNextStage();
  }

  // Birthday

  selectBirthday(type: 'month' | 'day' | 'year', value: string | number): void {
    if (this.etapa !== 4) {
      return;
    }

    switch (type) {
      case 'month':
        this.selectedMonth = String(value);
        break;

      case 'day':
        this.selectedDay = Number(value);
        break;

      case 'year':
        this.selectedYear = Number(value);
        break;
    }

    this.clampSelectedDay();
    this.updateBirthday();
  }

  get availableDays(): number[] {
    if (!this.selectedMonth) {
      return this.days;
    }

    const monthNumber = this.months.indexOf(this.selectedMonth) + 1;
    const year = this.selectedYear ?? new Date().getFullYear();

    const daysInMonth = new Date(year, monthNumber, 0).getDate();

    return Array.from({ length: daysInMonth }, (_, index) => index + 1);
  }

  private clampSelectedDay(): void {
    if (this.selectedDay === null) {
      return;
    }

    if (this.selectedDay > this.availableDays.length) {
      this.selectedDay = null;
    }
  }

  private updateBirthday(): void {
    const { selectedMonth, selectedDay, selectedYear } = this;

    if (!selectedMonth || selectedDay === null || selectedYear === null) {
      this.playerService.profile.birthday = '';
      return;
    }

    const monthNumber = this.months.indexOf(selectedMonth) + 1;

    if (monthNumber < 1 || !this.isValidDate(selectedYear, monthNumber, selectedDay)) {
      this.playerService.profile.birthday = '';
      return;
    }

    const month = String(monthNumber).padStart(2, '0');
    const day = String(selectedDay).padStart(2, '0');

    this.playerService.profile.birthday = `${selectedYear}-${month}-${day}`;

    this.playerService.saveProfile();
  }

  private isValidDate(year: number, month: number, day: number): boolean {
    const date = new Date(year, month - 1, day);

    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
  }

  private restoreBirthdaySelections(): void {
    const birthday = this.playerService.profile.birthday;

    if (!birthday) {
      return;
    }

    const parts = birthday.split('-');

    if (parts.length !== 3) {
      return;
    }

    const [year, month, day] = parts.map(Number);

    if (!year || !month || !day || month < 1 || month > 12 || !this.isValidDate(year, month, day)) {
      return;
    }

    this.selectedYear = year;
    this.selectedMonth = this.months[month - 1];
    this.selectedDay = day;
  }

  // Game

  startJourney(): void {
    if (
      this.etapa !== 4 ||
      !this.playerService.profile.birthday
    ) {
      return;
    }

    this.playerService.saveProfile();
    this.router.navigate(['/game']);
  }
}
