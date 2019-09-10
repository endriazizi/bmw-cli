import { NgModule } from '@angular/core';
// For Ng Directive
import { CommonModule } from '@angular/common';
// Route
import { Routes, RouterModule } from '@angular/router';

// Service
import { RentalService } from './shared/rental.service';

import { RentalComponent } from '../rental/rental.component';
import { RentalListComponent } from '../rental/rental-list/rental-list.component';
import { RentalListItemComponent } from '../rental/rental-list-item/rental-list-item.component';
import { RentalDetailComponent } from './rental-detail/rental-detail.component';
import { HttpClientModule } from '@angular/common/http';

// Pipe
import { NgPipesModule } from 'ngx-pipes';
import { UppercasePipe } from '../common/pipes/uppercase.pipes';
// Map
import { MapModule } from '../common/map/map.module';

import { AuthGuard } from '../auth/shared/auth.guard';

import { Daterangepicker } from 'ng2-daterangepicker';
import { RentalDetailBookingComponent } from './rental-detail/rental-detail-booking/rental-detail-booking.component';



// RentalComponent is a container that will display its children component
// on Html side     <router-outlet></router-outlet>
const routes: Routes = [
  {
    path: 'rentals', component: RentalComponent,
    children: [
      { path: '', component: RentalListComponent },
      { path: ':rentalId', component: RentalDetailComponent, canActivate: [AuthGuard] }
    ]
  }
];

// NgModule is a Decoretor with decorations fields
@NgModule({
  // we must declare here all new components after we imported them!!!
  declarations: [
    RentalComponent,
    RentalListComponent,
    RentalListItemComponent,
    RentalDetailComponent,
    UppercasePipe,
    RentalDetailBookingComponent

  ],
  imports: [CommonModule, RouterModule.forChild(routes), HttpClientModule, NgPipesModule, MapModule, Daterangepicker],
  providers: [RentalService]
})
export class RentalModule { }
