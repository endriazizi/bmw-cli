import { Component, OnInit } from '@angular/core';
// Get access to current Route
import { ActivatedRoute } from '@angular/router';
import { Rental } from '../shared/rental.model';
import { RentalService } from '../shared/rental.service';





@Component({
  selector: 'bwm-rental-detail',
  templateUrl: './rental-detail.component.html',
  styleUrls: ['./rental-detail.component.scss']
})
export class RentalDetailComponent implements OnInit {

  // currentId: string;
  myRental: Rental;

  // Inject ActivatedRoute to our cunstructor
  // Inject Rental Service to our cunstructor
  constructor(private route: ActivatedRoute,
    private rentalService: RentalService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        console.log('rental-detail.component params: ', params)
        // getting rentalId from URL
        // this.currentId = params['rentalId'];
        this.getRental(params['rentalId'])
      })
  }

  getRental(rentalId: string) {
    this.rentalService.getRentalById(rentalId).subscribe(
      (rental: Rental) => {
        this.myRental = rental;
      }
    )
  }

}
