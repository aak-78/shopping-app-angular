import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  Subject,
  Subscription,
  switchMap,
} from 'rxjs';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: 'auth.component.html',
  styleUrls: ['auth.component.css'],
})
export class AuthComponent implements OnDestroy, OnInit {
  // Declarations --->

  // Messages
  emailMessage: string = '';
  passwordMessage: string = '';
  messagestring = '';
  errorMessage: string = '';

  //Error
  error;

  //Form
  authForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  //Modes and Statuses
  isLoginMode = true;
  isLoading = false;
  emailNameIsValid = false;

  //Subscriptions
  subscription: Subscription;
  subscriptionEmail: Subscription;
  subscriptionPassword: Subscription;
  subscriptionErrorMessage: Subscription;

  // Other
  checkEmail$!: Observable<{}>;
  private searchText$ = new Subject<string>();

  constructor(private authService: AuthService) {}

  onChangeMode() {
    this.isLoginMode = !this.isLoginMode;
    // this.authForm.reset();
    this.authService.emailMessage$.next(null);
    this.authService.passwordMessage$.next(null);
    // this.authService.errorMessage$.next(null);
    if (!this.isLoading) this.onCheckEmail(this.authForm.controls.email.value);
  }

  onSubmit() {
    if (!this.authForm.valid) {
      return;
    }
    const email = this.authForm.controls.email.value;
    const password = this.authForm.controls.password.value;
    if (this.isLoginMode) {
      console.log(email, password, ' in Auth');
      this.authService.login(email, password);
    } else {
      console.log(email, password, ' in Auth');
      this.authService.signupUser(email, password);
    }
    // this.authForm.reset();
  }

  getValue(event: Event): string {
    // console.log('getValue: ', (event.target as HTMLInputElement).value);
    //event['key']
    return (event.target as HTMLInputElement).value;
  }

  onCheckEmail(searchString: string) {
    this.authService.emailMessage$.next(null);
    this.authService.emailNameIsValid$.next(false);
    if (this.authForm.controls.email.invalid) {
      this.authService.emailMessage$.next('Please enter valid email');
    } else {
      if (!this.isLoginMode) {
        this.searchText$.next(searchString);
      }
    }
    // console.log(serachString);
  }

  ngOnInit() {
    // Subscribe messages from authService
    this.subscription = this.authService.emailMessage$.subscribe(
      (value) => (this.emailMessage = value)
    );
    this.subscription = this.authService.passwordMessage$.subscribe(
      (value) => (this.passwordMessage = value)
    );
    this.subscriptionErrorMessage = this.authService.errorMessage$.subscribe(
      (value) => {
        this.errorMessage = value;
        console.log('NgInit ', this.errorMessage);
      }
    );
    this.subscription = this.authService.emailNameIsValid$.subscribe(
      (value) => {
        this.emailNameIsValid = value;
      }
    );
    this.subscription = this.authService.isLoading$.subscribe(
      (value) => (this.isLoading = value)
    );

    //Check email control for validation
    if (
      this.authForm.controls.email.invalid &&
      this.authForm.controls.email.dirty
    ) {
      this.authService.emailMessage$.next('Please enter valid email');
    }

    this.checkEmail$ = this.searchText$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(async (email) => {
        return this.authService.checkEmail(email);
      })
    );
    this.subscription = this.checkEmail$.subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // Get status of Password Form and create new variable to use in HTML template
  get password() {
    return this.authForm.get('password');
  }
}
