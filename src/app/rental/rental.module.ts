import { NgModule } from '@angular/core';
// For Ng Directive
import { CommonModule } from '@angular/common';


import { RentalComponent } from '../rental/rental.component';
import { RentalListComponent } from '../rental/rental-list/rental-list.component';
import { RentalListItemComponent } from '../rental/rental-list-item/rental-list-item.component';


//NgModule is a Decoretor with decorations fields
@NgModule({
  //we must declare here all new components after we imported them!!!
  declarations: [
    RentalComponent,
    RentalListComponent,
    RentalListItemComponent
  ],
  imports: [CommonModule]
})
export class RentalModule { }
