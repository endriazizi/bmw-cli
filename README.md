# BwmCli

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

ng g component auth/login
ng g component auth/register

98  - Login Reactive Forms: https://angular.io/guide/reactive-forms
99  - ANGULAR AUTH AND FORM | Login Form Validation: https://angular-templates.io/tutorials/about/angular-forms-and-validations
100 - ANGULAR AUTH AND FORM | Login Error Display
101 - ANGULAR AUTH AND FORM | LOGIN USER
102 - ANGULAR AUTH AND FORM | Register Success Message and Images in App
      using import { ActivatedRoute } from '@angular/router'; [bwm-cli/src/app/auth/login/login.component.ts]

106 - ANGULAR AUTH AND FORM | Authentication Logout and Display Username
      <a class="nav-link">{{auth.getUsername()}}</a>
107 - ANGULAR AUTH AND FORM | Auth Guard - Protect Pages


import { AuthGuard } from '../auth/shared/auth.guard';

const routes: Routes = [
  {
    path: 'rentals', component: RentalComponent,
    children: [
      { path: '', component: RentalListComponent },
      { path: ':rentalId', component: RentalDetailComponent, canActivate: [AuthGuard] }
    ]
  }
];

108 - ANGULAR AUTH AND FORM | Send Authorise Request - HTTP Interceptors
##### Interceptors Links #####
      https://medium.com/@ryanchenkie_40935/angular-authentication-using-the-http-client-and-http-interceptors-2f9d1540eb8
      https://angular.io/api/common/http/HttpInterceptor
##### Multi Property In Providers #####
      https://stackoverflow.com/questions/38144641/what-is-multi-provider-in-angular2


ng2-datarangepicker
npm install ng2-daterangepicker@2.0.12 --save
https://github.com/evansmwendwa/ng2-daterangepicker

peerDependencies
Please note and install the following peerDependencies if necessary for your setup

"peerDependencies": {
"@types/jquery": "^3.2.12",
"jquery": "^3.2.1",
"moment": "^2.19.1"
}

npm install --save @types/jquery@3.2.12 jquery@3.2.1
Share Component Data with Other Components
https://levelup.gitconnected.com/angular-7-share-component-data-with-other-components-1b91d6f0b93f?gi=30dd3136c827
https://angular.io/guide/component-interaction


git commit -m "Adds logi and register component, adds authentication, adds guard and token interceptor"
