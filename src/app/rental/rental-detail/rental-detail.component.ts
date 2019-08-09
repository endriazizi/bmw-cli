import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// Get access to current Route


@Component({
  selector: 'bwm-rental-detail',
  templateUrl: './rental-detail.component.html',
  styleUrls: ['./rental-detail.component.scss']
})
export class RentalDetailComponent implements OnInit {

  currentId: string;
  // Inject ActivatedRoute to our cunstructor
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.params.subscribe(
      (params) => {
        console.log('rental-detail.component params: ', params)
        this.currentId = params['rentalId'];

      })
  }

}
