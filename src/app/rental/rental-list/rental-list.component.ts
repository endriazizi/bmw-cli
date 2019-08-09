import { Component, OnInit } from '@angular/core';
//Service
import { RentalService } from '../shared/rental.service';





@Component({
  selector: 'bwm-rental-list',
  templateUrl: './rental-list.component.html',
  styleUrls: ['./rental-list.component.scss']
})
export class RentalListComponent implements OnInit {

  rentals: any[] = [];
  // Inject the Service inside the Contructor
  constructor(private rentalService: RentalService) { }

  //ngOnInit is a Life Cycle method, checkout Angular Documentation
  ngOnInit() {
    this.rentals = this.rentalService.getRentals();
  }

}
