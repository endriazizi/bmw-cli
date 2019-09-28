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


113 - SERVER SIDE BOOKINGS | Add Booking Model
Understanding relations between models ***


114 - SERVER SIDE BOOKINGS | Add Booking Controller

115 - SERVER SIDE BOOKINGS | Add Booking Controller Implemetation

116 - SERVER SIDE BOOKINGS | Validate Booking

117 - SERVER SIDE BOOKINGS | Booking Improvements

117 - ANGULAR BOOKINGS | DISABLE ALREADY BOOKED DATES IN CALENDAR

npm install --save @ng-bootstrap/ng-bootstrap


127 - ANGULAR BOOKING - REQUEST TO CREATE BOOKING


128 - ANGULAR BOOKING - UPDATE CALENDAR AND HANDLE ERRORS


Toaster Package Angular 6
Hello Guys

In the next lecture we will use Toaster package that is not compatible with Angular 6. In order to avoid issues you need to use this package: https://www.npmjs.com/package/ngx-toastr

npm install ngx-toastr --save

angular.json adds
            "styles": [
              "src/styles.scss",
              "./node_modules/bootstrap/dist/css/bootstrap.min.css",
              "./node_modules/font-awesome/css/font-awesome.min.css",
              "./node_modules/ngx-toastr/toastr.css"



There are just small changes you need to do in next video:

1. Import "node_modules/ngx-toastr/toastr.css" to styles field of angular.json

2. To app.module.ts import { ToastrModule } from 'ngx-toastr';

in imports array include this: ToastrModule.forRoot()

3. in component where you want to use toaster you need to import { ToastrService } from 'ngx-toastr';

and also inject to constructor, You don't need to use ContainerRef!

Please watch next video and keep this changes in mind (:

For more info check website of package and please watch last section video: Migration To Angular 6 where I am explaining what you need to fix in order to have your applications without issues. I am highly suggesting to watch it.

Ok that's it , have a nice day and happy coding.

131 - ANGULAR BOOKING - Reset Daterange Picker + ViewChild



Filip — Instructor · 2 months ago
Hello Akshit

Are you using Angular 8 because i think it's related to newer version of Angular.

Let's try this:

1. remove forRoot from NgbModule.forRoot(),

so leave only

NgbModule in app.module.ts

2. everywhere where we are using ViewChild decorator change syntax like this:

@ViewChild(DaterangePickerComponent,{static: false})

@ViewChild('cardCvc', {static: false}) cardCvcRef: ElementRef;

You just need to add static option

I will try to update course as soon as possible to Angular 8.

Cheers.

Filip


132 - View encapsulation


TO STUDY!!!
Passing variables through Express middleware  !!!

https://www.google.com/search?sxsrf=ACYBGNQx61lfvN7l6tdktUSJBYm_D7SLSQ%3A1569612472505&ei=uGKOXei-HtK31fAP9bCuqAM&q=express+res.locals.user&oq=express+res.locals.user&gs_l=psy-ab.3...20381.20381..20540...0.0..0.0.0.......0....2j1..gws-wiz.PnOwU3Vp32g&ved=0ahUKEwjo-u6O3vHkAhXSWxUIHXWYCzUQ4dUDCAs&uact=5

https://www.youtube.com/watch?v=zPYmM9K8-g8
