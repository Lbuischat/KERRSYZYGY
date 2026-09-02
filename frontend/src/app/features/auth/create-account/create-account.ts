import {
  AfterViewInit,
  Component,
  OnDestroy,
  PLATFORM_ID,
  afterNextRender,
  inject
} from '@angular/core';

import {
  FormsModule
} from '@angular/forms';

import {
  Router, RouterLink
} from '@angular/router';

import {
  isPlatformBrowser
} from '@angular/common';

import {
  HttpClient
} from '@angular/common/http';


// =========================================================
// BACKGROUND STAR
// =========================================================

interface BackgroundStar {

  left: number;

  top: number;

  size: number;

  opacity: number;

  delay: number;

}


@Component({
  selector: 'app-create-account',

  standalone: true,

  imports: [
    FormsModule, RouterLink
  ],

  templateUrl: './create-account.html',

  styleUrl: './create-account.css'
})
export class CreateAccount
  implements AfterViewInit, OnDestroy {


  // =========================================================
  // DEPENDENCIES
  // =========================================================

  private readonly http =
    inject(HttpClient);

  private readonly platformId =
    inject(PLATFORM_ID);

  private readonly router =
    inject(Router);


  // =========================================================
  // CREATE ACCOUNT FORM
  // =========================================================

  username = '';

  email = '';

  password = '';

  confirmPassword = '';


  // =========================================================
  // STATE
  // =========================================================

  isCreatingAccount = false;

  errorMessage = '';

  successMessage = '';


  // =========================================================
  // BACKGROUND STARS
  // =========================================================

  backgroundStars: BackgroundStar[] = [];


  // =========================================================
  // CONSTRUCTOR
  // =========================================================

  constructor() {

    /*
     * Generate the same type of subtle
     * background star field used by Login.
     */
    this.createBackgroundStars();


    /*
     * Everything below this point is browser-only.
     *
     * The Create Account screen does not currently
     * need a continuous animation loop, but keeping
     * the browser check here makes the component safe
     * with Angular SSR/hydration.
     */
    afterNextRender(() => {

      if (
        !isPlatformBrowser(
          this.platformId
        )
      ) {

        return;

      }

    });

  }


  // =========================================================
  // ANGULAR VIEW INITIALIZATION
  // =========================================================

  ngAfterViewInit(): void {

    /*
     * Nothing external needs to be initialized here
     * for Create Account.
     *
     * This lifecycle hook is intentionally kept so the
     * component follows the same browser-safe structure
     * as Login and can easily accommodate future
     * visual initialization if needed.
     */

  }


  // =========================================================
  // CREATE ACCOUNT
  // =========================================================

  createAccount(): void {

    this.errorMessage = '';

    this.successMessage = '';


    // ---------------------------------------------------------
    // Basic validation
    // ---------------------------------------------------------

    if (
      !this.username.trim() ||
      !this.email.trim() ||
      !this.password ||
      !this.confirmPassword
    ) {

      this.errorMessage =
        'Please fill in all fields.';

      return;

    }


    // ---------------------------------------------------------
    // Password confirmation
    // ---------------------------------------------------------

    if (
      this.password !==
      this.confirmPassword
    ) {

      this.errorMessage =
        'Passwords do not match.';

      return;

    }


    // ---------------------------------------------------------
    // Password length
    // ---------------------------------------------------------

    if (
      this.password.length < 8
    ) {

      this.errorMessage =
        'Your password must be at least 8 characters long.';

      return;

    }


    // ---------------------------------------------------------
    // Prevent duplicate requests
    // ---------------------------------------------------------

    if (
      this.isCreatingAccount
    ) {

      return;

    }


    // ---------------------------------------------------------
    // Begin request
    // ---------------------------------------------------------

    this.isCreatingAccount = true;


    this.http.post(
      'http://localhost:3000/users',
      {

        username:
          this.username.trim(),

        email:
          this.email.trim(),

        password:
          this.password

      }
    )
    .subscribe({

      // -------------------------------------------------------
      // SUCCESS
      // -------------------------------------------------------

      next: (response) => {

        console.log(
          '✅ ACCOUNT CREATED:',
          response
        );


        this.isCreatingAccount =
          false;


        this.successMessage =
          'ACCOUNT CREATED.';


        /*
         * Let the success message breathe briefly
         * before returning to the login screen.
         */
        setTimeout(() => {

          this.router.navigate(
            ['/login']
          );

        }, 1200);

      },


      // -------------------------------------------------------
      // ERROR
      // -------------------------------------------------------

      error: (error) => {

        console.error(
          '❌ ACCOUNT CREATION FAILED:',
          error
        );


        this.isCreatingAccount =
          false;


        if (
          error.status === 409
        ) {

          this.errorMessage =
            'An account with that email already exists.';

        }

        else {

          this.errorMessage =
            'Something went wrong while creating your account.';

        }

      }

    });

  }


  // =========================================================
  // BACKGROUND STARS
  // =========================================================

  private createBackgroundStars(): void {

    /*
     * Keep this identical to Login so both screens
     * share the same density, brightness and reveal.
     */
    const numberOfStars = 180;


    for (
      let i = 0;
      i < numberOfStars;
      i++
    ) {

      this.backgroundStars.push({

        left:
          Math.random() * 100,

        top:
          Math.random() * 100,

        size:
          Math.random() < 0.9
            ? 1
            : 2,

        opacity:
          0.08 +
          Math.random() * 0.17,

        /*
         * The Create Account screen begins
         * with the stars already revealing,
         * just like Login.
         */
        delay:
          Math.random() * 2.5

      });

    }

  }


  // =========================================================
  // RETURN TO LOGIN
  // =========================================================

  goToLogin(): void {

    this.router.navigate(
      ['/login']
    );

  }


  // =========================================================
  // CLEANUP
  // =========================================================

  ngOnDestroy(): void {

    /*
     * There is currently no requestAnimationFrame
     * loop on this component, so there is nothing
     * to cancel here.
     *
     * Keeping the lifecycle method makes it explicit
     * that this screen owns no persistent animation.
     */

  }

}