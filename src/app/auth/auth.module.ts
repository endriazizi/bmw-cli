import { NgModule } from '@angular/core';


// For Ng Directive
import { CommonModule } from '@angular/common';
// Interceptor
import { HTTP_INTERCEPTORS } from '@angular/common/http';



// For Routing
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { AuthService } from './shared/auth.service';

// import { FormsModule } from '@angular/forms';
// import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './shared/auth.guard';
import { TokenInterceptor } from './shared/token.interceptor';





// RentalComponent is a container that will display its children component
// on Html side     <router-outlet></router-outlet>
const routes: Routes = [
  {
    path: 'login', component: LoginComponent, canActivate: [AuthGuard]
  },
  {
    path: 'register', component: RegisterComponent, canActivate: [AuthGuard]
  }
];


@NgModule({
  // we must declare here all new components after we imported them!!!
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [AuthService, AuthGuard, {
    provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true
  }]
})
export class AuthModule { }
