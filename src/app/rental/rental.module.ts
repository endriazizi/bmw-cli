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


// RentalComponent is a container that will display its childrens component
const routes: Routes = [
  {
    path: 'rentals', component: RentalComponent,
    children: [
      { path: '', component: RentalListComponent },
      { path: ':rentalId', component: RentalDetailComponent }
    ]
  }
]

//NgModule is a Decoretor with decorations fields
@NgModule({
  //we must declare here all new components after we imported them!!!
  declarations: [
    RentalComponent,
    RentalListComponent,
    RentalListItemComponent,
    RentalDetailComponent
  ],
  imports: [CommonModule, RouterModule.forChild(routes)],
  providers: [RentalService]
})
export class RentalModule { }
