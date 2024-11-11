import { inject, Injectable, signal } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  user,
} from '@angular/fire/auth';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { Admin } from './admin.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseAuth = inject(Auth);
  private userSubject = new BehaviorSubject<any>(user(this.firebaseAuth));
  user$ = this.userSubject.asObservable();
  currentUserSig = signal<Admin | null | undefined>(undefined);

  constructor() {
    user(this.firebaseAuth).subscribe((user: any) => {
      this.userSubject.next(user);
      this.currentUserSig.set(
        user
          ? {
              email: user.email,
              displayName: user.displayName,
            }
          : null
      );
    });
  }

  register(
    email: string,
    password: string,
    username: string
  ): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then((response) => {
      updateProfile(response.user, { displayName: username });
    });
    return from(promise);
  }

  login(email: string, password: string): Observable<void> {
    return from(
      signInWithEmailAndPassword(this.firebaseAuth, email, password).then(
        () => {
          this.userSubject.next(this.firebaseAuth.currentUser);
        }
      )
    );
  }

  logout(): Observable<void> {
    return from(
      signOut(this.firebaseAuth).then(() => {
        this.userSubject.next(null);
      })
    );
  }

  isLoggedin() {
    return !!this.currentUserSig()?.email;
  }
}
