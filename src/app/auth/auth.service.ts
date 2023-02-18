import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, Subject, Subscription, tap, throwError } from 'rxjs';

import { User } from './user.model';

// Error response
interface Error {
  error: {
    code: number;
    message: string;
    errors: [
      {
        message: string;
        domain: string;
        reason: string;
      }
    ];
  };
}

// login and signup response
interface Response {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

interface CheckEmailResponse {
  kind: string;
  allProviders: [string];
  registered: boolean;
  sessionId: string;
  signinMethods: [string];
}

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit, OnDestroy {
  // Messages
  emailMessage$ = new Subject<string>();
  passwordMessage$ = new Subject<string>();
  errorMessage$ = new BehaviorSubject<string>(null);
  errorMessage2$ = new Observable<string>();

  emailNameIsValid$ = new Subject<boolean>(); // Check is email already taken in signup mode
  userAuthorized$ = new BehaviorSubject<boolean>(false); // Check is user authorized and can Navigate

  user$ = new BehaviorSubject<User>(null);

  key = 'AIzaSyCfq4yG5uQguBa2Du-mSEa4_C03ynmh0qs';

  signupUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp';
  loginUrl =
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword';

  // response = {};
  isLoading$ = new Subject<boolean>(); // Show proces of login and signup - and we show wait logo

  constructor(private http: HttpClient, private router: Router) {}

  subscription: Subscription;

  ngOnInit(): void {
    this.emailMessage$.next(null);
    this.passwordMessage$.next(null);
    this.errorMessage$.next(null);
    this.emailNameIsValid$.next(false);
    this.isLoading$.next(false);
    this.userAuthorized$.next(false);
  }

  signupUser(email: string, password: string) {
    this.isLoading$.next(true);
    this.clearAllMessages();
    this.subscription = this.http
      .post<Response>(
        this.signupUrl,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        },
        { params: new HttpParams().set('key', this.key) }
      )
      .pipe(
        catchError((err) => {
          this.isLoading$.next(false);
          return this.handleError(err);
        })
      )
      .pipe(
        tap((response) => {
          this.handleUserAuth(response);
        })
      )
      .subscribe((response) => {
        this.isLoading$.next(false);
        this.userAuthorized$.next(true);
        this.router.navigate(['/recipes']);
      });
  }

  login(email: string, password: string) {
    this.isLoading$.next(true);
    this.clearAllMessages();
    this.http
      .post<Response>(
        this.loginUrl,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        },
        { params: new HttpParams().set('key', this.key) }
      )
      .pipe(
        catchError((err) => {
          this.isLoading$.next(false);
          return this.handleError(err);
        }),
        tap((response) => {
          this.handleUserAuth(response);
        })
      )
      .subscribe((response) => {
        this.isLoading$.next(false);
        this.userAuthorized$.next(true);
        this.handleUserAuth(response);
        this.clearAllMessages();
        this.router.navigate(['/recipes']);
      });
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: Date;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) return;

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );
    if (loadedUser.token) {
      this.user$.next(loadedUser);
      this.userAuthorized$.next(true);
    }
  }

  clearAllMessages() {
    this.emailMessage$.next(null);
    this.passwordMessage$.next(null);
    this.errorMessage$.next(null);
  }

  logout() {
    this.clearAllMessages();
    this.emailNameIsValid$.next(false);
    this.isLoading$.next(false);
    this.userAuthorized$.next(false);
    this.user$.complete();
    localStorage.removeItem('userData');
    this.router.navigate(['/auth']);
  }

  checkEmail(email: string) {
    this.errorMessage$.next(null);
    this.emailNameIsValid$.next(false);
    this.subscription = this.http
      .post(
        'https://identitytoolkit.googleapis.com/v1/accounts:createAuthUri?key=AIzaSyCfq4yG5uQguBa2Du-mSEa4_C03ynmh0qs',
        {
          identifier: email,
          continueUri:
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCfq4yG5uQguBa2Du-mSEa4_C03ynmh0qs',
        }
      )
      .pipe(
        catchError((err) => {
          return this.handleError(err);
        })
      )
      .subscribe((response: CheckEmailResponse) => {
        if (response.registered) {
          this.emailMessage$.next(
            'Email allready taken. Pelease select different email. '
          );
        } else {
          this.emailNameIsValid$.next(true);
        }
        return response;
      });
    return this.subscription;
  }

  private handleUserAuth(responseData: Response) {
    const expirationTime = new Date(
      new Date().getTime() + +responseData.expiresIn * 1000
    );
    const user = new User(
      responseData.email,
      responseData.localId,
      responseData.idToken,
      expirationTime
    );
    localStorage.setItem('userData', JSON.stringify(user));
    this.user$.next(user);
  }

  private handleError(error: HttpErrorResponse) {
    switch (error.error.error.message) {
      case 'EMAIL_NOT_FOUND': {
        this.emailMessage$.next('Email not found');
        this.errorMessage$.next(null);
        break;
      }
      case 'INVALID_PASSWORD': {
        this.errorMessage$.next('The password is invalid');
        break;
      }
      case 'INVALID_EMAIL': {
        this.emailMessage$.next('Invalid emeil');
        this.errorMessage$.next(null);
        break;
      }
      case 'USER_DISABLED': {
        this.errorMessage$.next(
          'The user account has been disabled by an administrator'
        );
        break;
      }
      case 'TOO_MANY_ATTEMPTS_TRY_LATER': {
        this.errorMessage$.next(
          'Too many attempts with invalid Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.'
        );
        break;
      }
      default: {
        this.errorMessage$.next('Error: ' + error.error.error.message);
      }
    }
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
