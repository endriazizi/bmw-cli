import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'bwm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private activeRouter: ActivatedRoute) { }

  loginForm: FormGroup;
  errors: any[] = [];
  notifyMessage: string = '';

  ngOnInit() {
    this.initForm();
    this.activeRouter.params.subscribe((params) => {
      if (params['registered'] === 'success') {
        // debugger;
        this.notifyMessage = 'You have been succesfuly registered, you can Login now!';
      }
    });
  }

  // Initialization of our form
  initForm() {
    this.loginForm = this.fb.group({
      // https://emailregex.com/
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
      password: ['', Validators.required]
    });
  }

  isInvalidInput(fieldName): boolean {
    return this.loginForm.controls[fieldName].invalid &&
      (this.loginForm.controls[fieldName].dirty || this.loginForm.controls[fieldName].touched);
  }

  isRequired(fieldName): boolean {
    return this.loginForm.controls[fieldName].errors.required;
  }

  login() {
    // debugger;
    // console.log(this.loginForm.value);

    this.auth.login(this.loginForm.value).subscribe(
      (token) => {
        // debugger;
        console.log('success!');
        this.router.navigate(['/rentals', { login: 'success' }]); // adds some infromation to URL { registered: 'success' }

      },
      // error
      (errorResponse) => {
        // tslint:disable-next-line: no-debugger
        // debugger;
        this.errors = errorResponse.error.errors;
        console.log('mio errore', errorResponse);

      }
    );
  }

}
