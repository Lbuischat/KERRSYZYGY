import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-start',
  imports: [FormsModule],
  templateUrl: './start.html',
  styleUrl: './start.css',
})
export class Start {
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

  selectedMonth = '';
  selectedDay: number | null = null;
  selectedYear: number | null = null;

  etapa = 0;

  constructor(
    public playerService: PlayerService,
    private router: Router
  ) {
    this.restoreBirthdaySelections();
  }

  // -------------------------
  // Navigation
  // -------------------------

  continue(): void {
    this.etapa++;
  }

  continueAfterGender(): void {
    if (!this.playerService.profile.gender) {
      return;
    }

    this.etapa++;
  }

  continueAfterPronouns(): void {
    if (!this.playerService.profile.pronouns) {
      return;
    }

    this.etapa++;
  }

  continueAfterBirthday(): void {
    if (!this.playerService.profile.birthday) {
      return;
    }

    this.playerService.saveProfile();
    this.etapa++;
  }

  // -------------------------
  // Profile
  // -------------------------

  selectGender(gender: string): void {
    this.playerService.profile.gender = gender;
    this.playerService.saveProfile();
  }

  selectUsername(): void {
    const username = this.playerService.profile.username.trim();

    if (!username) {
      return;
    }

    this.playerService.profile.username = username;
    this.playerService.saveProfile();

    this.etapa++;
  }

  selectPronouns(pronouns: string): void {
    this.playerService.profile.pronouns = pronouns;
    this.playerService.saveProfile();
  }

  // -------------------------
  // Birthday
  // -------------------------

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

    this.updateBirthday();
  }

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

    const month = String(monthNumber).padStart(2, '0');
    const day = String(this.selectedDay).padStart(2, '0');

    this.playerService.profile.birthday =
      `${this.selectedYear}-${month}-${day}`;

    this.playerService.saveProfile();
  }

  private isValidDate(
    year: number,
    month: number,
    day: number
  ): boolean {
    const date = new Date(year, month - 1, day);

    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    );
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

  // -------------------------
  // Game
  // -------------------------

  startJourney(): void {
    this.router.navigate(['/game']);
  }
}