import {
  APP_INITIALIZER,
  ApplicationConfig,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { AuthService } from './shared/services/auth.service';
import { firstValueFrom } from 'rxjs';

const firebaseConfig = {
  apiKey: 'AIzaSyCtbjUAdUB1SGWH2RLilhRrbuISs5CxWNI',
  authDomain: 'ecommerce-catalog-b49f7.firebaseapp.com',
  projectId: 'ecommerce-catalog-b49f7',
  storageBucket: 'ecommerce-catalog-b49f7.firebasestorage.app',
  messagingSenderId: '416249987476',
  appId: '1:416249987476:web:6cc68f7879122469c94f81',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
    provideHttpClient(withFetch()),
    [
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
      provideAuth(() => getAuth()),
    ],
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: (authService: AuthService) => {
        return () =>
          firstValueFrom(authService.user$).then((user: any) => {
            authService.currentUserSig.set(
              user
                ? {
                    email: user.email,
                    displayName: user.displayName,
                  }
                : null
            );
          });
      },
      deps: [AuthService],
    },
  ],
};
