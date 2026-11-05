import {
  Component,
  ElementRef,
  QueryList,
  ViewChildren
} from '@angular/core';

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

  // =========================================
  // STAGE ELEMENTS
  // =========================================

  @ViewChildren('stageSection', { read: ElementRef })
  private stageSections!: QueryList<ElementRef<HTMLElement>>;

  // =========================================
  // BACKGROUND
  // =========================================

  readonly backgroundStars: BackgroundStar[] =
    Array.from({ length: 180 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() < 0.9 ? 1 : 2,
      opacity: 0.08 + Math.random() * 0.17
    }));

  readonly celestialEvents: CelestialEvent[] =
    Array.from({ length: 5 }, (_, id) => ({
      id,
      type: Math.random() < 0.5 ? 'comet' : 'meteor',
      left: Math.random() * 100,
      top: Math.random() * 70,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 8
    }));

  // =========================================
  // OPTIONS
  // =========================================

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
    (_, index) => index + 1
  );

  readonly years = Array.from(
    { length: 100 },
    (_, index) => new Date().getFullYear() - index
  );

  // =========================================
  // BIRTHDAY SELECTIONS
  // =========================================

  selectedMonth = '';
  selectedDay: number | null = null;
  selectedYear: number | null = null;

  // Stages: 0 through 5
  etapa = 0;

  // =========================================
  // CONSTRUCTOR
  // =========================================

  constructor(
    public playerService: PlayerService,
    private router: Router,
    public readonly languageService: LanguageService
  ) {
    this.restoreBirthdaySelections();
  }

  // =========================================
  // NAVIGATION
  // =========================================

  continue(): void {
    if (this.etapa !== 0) {
      return;
    }

    this.goToNextStage();
  }

  private goToNextStage(): void {
    if (this.etapa >= 5) {
      return;
    }

    this.etapa++;

    requestAnimationFrame(() => {
      const nextSection = this.stageSections.get(this.etapa);

      nextSection?.nativeElement.scrollIntoView({
        behavior: window.matchMedia(
          '(prefers-reduced-motion: reduce)'
        ).matches
          ? 'auto'
          : 'smooth',
        block: 'start'
      });
    });
  }

  // =========================================
  // GENDER
  // =========================================

  selectGender(gender: string): void {
    if (this.etapa !== 1) {
      return;
    }

    this.playerService.profile.gender = gender;
    this.playerService.saveProfile();
  }

  continueAfterGender(): void {
    if (
      this.etapa !== 1 ||
      !this.playerService.profile.gender
    ) {
      return;
    }

    this.goToNextStage();
  }

  // =========================================
  // USERNAME
  // =========================================

  selectUsername(): void {
    if (this.etapa !== 2) {
      return;
    }

    const username =
      this.playerService.profile.username.trim();

    if (!username) {
      return;
    }

    this.playerService.profile.username = username;
    this.playerService.saveProfile();

    this.goToNextStage();
  }

  // =========================================
  // PRONOUNS
  // =========================================

  selectPronouns(pronouns: string): void {
    if (this.etapa !== 3) {
      return;
    }

    this.playerService.profile.pronouns = pronouns;
    this.playerService.saveProfile();
  }

  continueAfterPronouns(): void {
    if (
      this.etapa !== 3 ||
      !this.playerService.profile.pronouns
    ) {
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
    if (this.etapa !== 4) {
      return;
    }

    switch (type) {
      case 'month':
        this.selectedMonth = String(value);
        break;

      case 'day':
        this.selectedDay = Number(value) || null;
        break;

      case 'year':
        this.selectedYear = Number(value) || null;
        break;
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

    const count = new Date(year, month, 0).getDate();

    return Array.from(
      { length: count },
      (_, index) => index + 1
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
    if (
      this.etapa !== 4 ||
      !this.playerService.profile.birthday
    ) {
      return;
    }

    this.playerService.saveProfile();
    this.goToNextStage();
  }

  private restoreBirthdaySelections(): void {
    const birthday =
      this.playerService.profile.birthday;

    if (!birthday) {
      return;
    }

    const match =
      /^(\d{4})-(\d{2})-(\d{2})$/.exec(birthday);

    if (!match) {
      return;
    }

    const [, y, m, d] = match;

    const year = Number(y);
    const month = Number(m);
    const day = Number(d);

    if (
      !this.validDate(year, month, day)
    ) {
      return;
    }

    this.selectedYear = year;
    this.selectedMonth = this.months[month - 1];
    this.selectedDay = day;
  }

  // =========================================
  // START → PLAYER PROFILE
  // =========================================

  startJourney(): void {
    if (this.etapa !== 5) {
      return;
    }

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