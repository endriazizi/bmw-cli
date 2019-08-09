import { Component, OnInit } from '@angular/core';
//Service
import { RentalService } from '../shared/rental.service';
import { Rental } from '../shared/rental.mode';


@Component({
  selector: 'bwm-rental-list',
  templateUrl: './rental-list.component.html',
  styleUrls: ['./rental-list.component.scss']
})
export class RentalListComponent implements OnInit {
  //rentals: any[] = [];
  rentals: Rental[] = [];
  // Inject the Service inside the Contructor
  constructor(private rentalService: RentalService) { }

  //ngOnInit is a Life Cycle method, checkout Angular Documentation
  ngOnInit() {
    // this.rentals = this.rentalService.getRentals();
    const rentalObservable = this.rentalService.getRentals();
    rentalObservable.subscribe(
      // two function
      // (rentals) => { this.rentals = rentals; }, //our data is rentals
      (rentals: Rental[]) => {
        this.rentals = rentals;
        this.rentals[0].city; // acces of first elemnt rentals's array

      }, //our data is rentals
      (err) => {
      },
      () => {
      }
    );

  }

}
