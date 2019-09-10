import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';




@Component({
  selector: 'bwm-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  formData: any = {};
  errors: any[] = [];
  ngOnInit() {
  }

  register() {
    console.log(this.formData);

    this.auth.registerService(this.formData).subscribe(
      // two callback function
      // success
      () => {
        console.log('success!');
        this.router.navigate(['/login', { registered: 'success' }]); // adds some infromation to URL { registered: 'success' }

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
