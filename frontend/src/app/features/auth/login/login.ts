import {
  Component,
  AfterViewInit,
  inject,
  PLATFORM_ID
} from '@angular/core';

import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements AfterViewInit {
  private http = inject(HttpClient);

  private platformId = inject(PLATFORM_ID);

  ngAfterViewInit() {
    console.log('CLIENT ID:', environment.googleClientId);

    // Only run Google Login in the browser
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // Wait for Google's script to load
    const checkGoogle = () => {

      if (typeof google === 'undefined') {
        setTimeout(checkGoogle, 100);
        return;
      }

      console.log('Google Client ID being used:', environment.googleClientId);

      google.accounts.id.initialize({
        client_id: environment.googleClientId,

        callback: (response: any) => {
          console.log('🎉 GOOGLE LOGIN SUCCESS!');

          this.http.post(
            'http://localhost:3000/users/google',
            {
              credential: response.credential
            }
          ).subscribe({
            next: (user) => {
              console.log('✅ BACKEND VERIFIED GOOGLE USER:', user);
            },
            error: (error) => {
              console.error('❌ BACKEND REJECTED GOOGLE TOKEN:', error);
            }
          });
        }
      });

      google.accounts.id.renderButton(
        document.getElementById('google-button'),
        {
          theme: 'outline',
          size: 'large',
          text: 'continue_with'
        }
      );
    };

    checkGoogle();
  }
}