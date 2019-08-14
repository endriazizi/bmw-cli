import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// For Routing
import { Routes, RouterModule } from '@angular/router';


// Check This AppRoutingModule!?!?
//import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { RentalComponent } from './rental/rental.component';
import { RentalModule } from './rental/rental.module';

const routes: Routes = [
  //{ path: '', component: RentalComponent },
  { path: '', redirectTo: '/rentals', pathMatch: 'full' }
  //,
  //{ path: 'temp', component: TempComponent }
]

@NgModule({
  //we must declare here all new components after we imported them!!!
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    RentalModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
