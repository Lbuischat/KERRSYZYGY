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
  imports: [FormsModule],
  templateUrl: './start.html',
  styleUrl: './start.css',
})
export class Start {

  // =========================================================
  // BACKGROUND STARS
  // STATIC — GENERATED ONCE
  // =========================================================

  backgroundStars: BackgroundStar[] = [];
  celestialEvents: CelestialEvent[] = [];


  // =========================================================
  // OPTIONS
  // =========================================================

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

  readonly genderOptions = [
    'Female',
    'Male',
    'Non-binary',
    'Other',
  ];

  readonly pronounOptions = [
    'She / Her',
    'He / Him',
    'They / Them',
    'It / Its',
  ];

  readonly days = Array.from(
    { length: 31 },
    (_, index) => index + 1
  );

  readonly years = Array.from(
    { length: 100 },
    (_, index) => new Date().getFullYear() - index
  );


  // =========================================================
  // BIRTHDAY SELECTIONS
  // =========================================================

  selectedMonth = '';
  selectedDay: number | null = null;
  selectedYear: number | null = null;


  // =========================================================
  // CURRENT STAGE
  // =========================================================

  etapa = 0;


  // =========================================================
  // CONSTRUCTOR
  // =========================================================

  constructor(
    public playerService: PlayerService,
    private router: Router,
    public readonly languageService: LanguageService,
  ) {
    this.createBackgroundStars();
    this.createCelestialEvents();
    this.restoreBirthdaySelections();
  }


  // =========================================================
  // BACKGROUND STARS
  // STATIC — NO ANIMATION
  // =========================================================

  private createBackgroundStars(): void {
    const numberOfStars = 180;

    for (let i = 0; i < numberOfStars; i++) {
      this.backgroundStars.push({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() < 0.9 ? 1 : 2,
        opacity: 0.08 + Math.random() * 0.17,
      });
    }
  }


  // =========================================================
  // CELESTIAL EVENTS
  // COMETS / METEORS
  // THESE ARE THE ONLY BACKGROUND OBJECTS THAT MOVE
  // =========================================================

  private createCelestialEvents(): void {
    const numberOfEvents = 5;

    for (let i = 0; i < numberOfEvents; i++) {
      this.celestialEvents.push({
        id: i,
        type: Math.random() < 0.5 ? 'comet' : 'meteor',
        left: Math.random() * 100,
        top: Math.random() * 70,
        duration: 2 + Math.random() * 3,
        delay: Math.random() * 8,
      });
    }
  }


  // =========================================================
  // NAVIGATION
  // ANGULAR animate.enter / animate.leave HANDLES
  // THE VISUAL TRANSITION — NO setTimeout NEEDED
  // =========================================================

  continue(): void {
    this.goToNextStage();
  }

  private goToNextStage(): void {
    if (this.etapa >= 5) {
      return;
    }

    this.etapa++;
  }


  // =========================================================
  // GENDER
  // =========================================================

  continueAfterGender(): void {
    if (!this.playerService.profile.gender) {
      return;
    }

    this.goToNextStage();
  }

  selectGender(gender: string): void {
    this.playerService.profile.gender = gender;
    this.playerService.saveProfile();
  }


  // =========================================================
  // USERNAME
  // =========================================================

  selectUsername(): void {
    const username =
      this.playerService.profile.username.trim();

    if (!username) {
      return;
    }

    this.playerService.profile.username = username;

    this.playerService.saveProfile();

    this.goToNextStage();
  }


  // =========================================================
  // PRONOUNS
  // =========================================================

  continueAfterPronouns(): void {
    if (!this.playerService.profile.pronouns) {
      return;
    }

    this.goToNextStage();
  }

  selectPronouns(pronouns: string): void {
    this.playerService.profile.pronouns = pronouns;

    this.playerService.saveProfile();
  }


  // =========================================================
  // BIRTHDAY
  // =========================================================

  selectBirthday(
    type: 'month' | 'day' | 'year',
    value: string | number
  ): void {

    switch (type) {
      case 'month':
        this.selectedMonth = value as string;
        break;

      case 'day':
        this.selectedDay = value as number;
        break;

      case 'year':
        this.selectedYear = value as number;
        break;
    }

    this.clampSelectedDay();
    this.updateBirthday();
  }


  // =========================================================
  // CONTINUE AFTER BIRTHDAY
  // =========================================================

  continueAfterBirthday(): void {
    if (!this.playerService.profile.birthday) {
      return;
    }

    this.playerService.saveProfile();

    this.goToNextStage();
  }


  // =========================================================
  // AVAILABLE DAYS
  // =========================================================

  get availableDays(): number[] {
    if (!this.selectedMonth) {
      return this.days;
    }

    const monthNumber =
      this.months.indexOf(this.selectedMonth) + 1;

    const year =
      this.selectedYear ?? new Date().getFullYear();

    const daysInMonth =
      new Date(year, monthNumber, 0).getDate();

    return Array.from(
      { length: daysInMonth },
      (_, index) => index + 1
    );
  }


  // =========================================================
  // CLAMP SELECTED DAY
  // =========================================================

  private clampSelectedDay(): void {
    if (this.selectedDay === null) {
      return;
    }

    const maxDay = this.availableDays.length;

    if (this.selectedDay > maxDay) {
      this.selectedDay = null;
    }
  }


  // =========================================================
  // UPDATE BIRTHDAY
  // =========================================================

  private updateBirthday(): void {
    if (
      !this.selectedMonth ||
      !this.selectedDay ||
      !this.selectedYear
    ) {
      this.playerService.profile.birthday = '';
      return;
    }

    const monthNumber =
      this.months.indexOf(this.selectedMonth) + 1;

    if (
      !this.isValidDate(
        this.selectedYear,
        monthNumber,
        this.selectedDay
      )
    ) {
      this.playerService.profile.birthday = '';
      return;
    }

    const month =
      String(monthNumber).padStart(2, '0');

    const day =
      String(this.selectedDay).padStart(2, '0');

    this.playerService.profile.birthday =
      `${this.selectedYear}-${month}-${day}`;

    this.playerService.saveProfile();
  }


  // =========================================================
  // DATE VALIDATION
  // =========================================================

  private isValidDate(
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


  // =========================================================
  // RESTORE BIRTHDAY
  // =========================================================

  private restoreBirthdaySelections(): void {
    const birthday =
      this.playerService.profile.birthday;

    if (!birthday) {
      return;
    }

    const parts = birthday.split('-');

    if (parts.length !== 3) {
      return;
    }

    const year = Number(parts[0]);
    const month = Number(parts[1]);
    const day = Number(parts[2]);

    if (
      !year ||
      !month ||
      !day ||
      month < 1 ||
      month > 12
    ) {
      return;
    }

    this.selectedYear = year;
    this.selectedMonth = this.months[month - 1];
    this.selectedDay = day;
  }


  // =========================================================
  // GAME
  // =========================================================

  startJourney(): void {
    this.router.navigate(['/game']);
  }
}