import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// For Routing
import { Routes, RouterModule } from '@angular/router';


// Check This AppRoutingModule!?!?
// import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';

// Added Modules
import { RentalModule } from './rental/rental.module';
import { AuthModule } from './auth/auth.module';



// on Html side     <router-outlet></router-outlet>
const routes: Routes = [
  // { path: '', component: RentalComponent },
  { path: '', redirectTo: '/rentals', pathMatch: 'full' }
  // ,
  // { path: 'temp', component: TempComponent }
];

@NgModule({
  // we must declare here all new components after we imported them!!!
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    RentalModule,
    AuthModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
