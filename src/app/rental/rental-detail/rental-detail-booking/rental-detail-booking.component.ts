import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';

import { HelperService } from '../../../common/service/helper.service';
import { Booking } from 'src/app/booking/shared/booking.model';
import * as moment from 'moment';
import { Rental } from '../../shared/rental.model';


import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookingService } from '../../../booking/shared/booking.service';

import { ToastrService } from 'ngx-toastr';

import { DaterangePickerComponent } from 'ng2-daterangepicker';



@Component({
  encapsulation: ViewEncapsulation.None, // Ovverride style of Datapicker
  selector: 'bwm-rental-detail-booking',
  templateUrl: './rental-detail-booking.component.html',
  styleUrls: ['./rental-detail-booking.component.scss']
})
export class RentalDetailBookingComponent implements OnInit, AfterViewInit {

  // https://angular.io/guide/component-interaction

  // @Input() price: number;
  // @Input() myBookings: Booking[];
  @Input() ourRental: Rental;

  // @ViewChild to access native dome element
  // https://www.techiediaries.com/angular-dom-queries-viewchild/
  @ViewChild(DaterangePickerComponent, { static: false })
  private picker: DaterangePickerComponent;

  // Understanding VieChild,
  // #bookingNoteTitle is a local variable reference from html side into
  // import ElementRef
  @ViewChild('bookingNoteTitle', { static: false })
  bookingNoteTitle: ElementRef;

  @ViewChild('pRef', { static: false })
  pRef: ElementRef;



  newBooking: Booking;
  modalRef: any;

  daterange: any = {};
  bookedOuDates: any[] = [];
  // Errors Array
  // array errors of type any = empty Array
  myErrors: any[] = [];


  // see original project for full list of options
  // can also be setup using the config service to apply to multiple pickers
  options: any = {
    locale: { format: Booking.DATE_FORMAT },
    alwaysShowCalendars: false,
    opens: 'left',
    autoUpdateInput: false,
    isInvalidDate: this.checkForInvalidDates.bind(this)
  };

  // Inject HelperService
  constructor(private helper: HelperService,
              private modalService: NgbModal,
              private bookingService: BookingService,
              private toastr: ToastrService) {
  }

  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }



  ngOnInit() {
    // crete Instance of newBooking
    this.newBooking = new Booking();
    this.getBookedOutDates();
    console.log(this.bookingNoteTitle.nativeElement);
    this.bookingNoteTitle.nativeElement.style.color = 'red';
  }

  // export class RentalDetailBookingComponent implements AfterViewInit;
  ngAfterViewInit() {
    // debugger;
    // 'understanding @VieChild using ElementRef by
    // #bookingNoteTitle is a local variable reference from html side into rental-detail-booking.component.html'
    // console.log(this.bookingNoteTitle.nativeElement);
    // this.bookingNoteTitle.nativeElement.style.color = 'red';
    console.log(this.pRef.nativeElement.innerHTML);

    this.pRef.nativeElement.innerHTML = 'DOM updated successfully!!!';
  }

  // date getting from calendar
  private checkForInvalidDates(date) {
    // debugger;
    // return this.bookedOuDates.includes(date.format(Booking.DATE_FORMAT)) || date.diff(moment(), 'days') < 0;
    return this.bookedOuDates.includes(this.helper.formatBookingDate(date)) || date.diff(moment(), 'days') < 0;

  }


  // Method
  private getBookedOutDates() {
    // Booking[] di tipo array
    const myBookings: Booking[] = this.ourRental.bookings;

    if (myBookings && myBookings.length > 0) {
      myBookings.forEach((booking: Booking) => {
        console.log('forEach of my bookings:', booking);
        // debugger;
        const dateRange = this.helper.getBookingRangeOfDates(booking.startAt, booking.endAt);
        // destructre array
        this.bookedOuDates.push(...dateRange);
        // debugger;

        /*     if (this.myBookings && this.myBookings.length > 0) {
              this.myBookings.forEach((booking: Booking) => {
                console.log('forEach of my bookings:', booking);
                // debugger;
                const dateRange = this.helper.getBookingRangeOfDates(booking.startAt, booking.endAt);
                // destructre array
                this.bookedOuDates.push(...dateRange);
                // debugger; */
      });
    }
  }

  // closeResult: string;

  /*  // Bootstrap Modal
   open(content) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
       */

  private addNewBookedOutDates(bookingData: any) {
    const dateRange = this.helper.getBookingRangeOfDates(bookingData.startAt, bookingData.endAt);
    this.bookedOuDates.push(...dateRange);
  }

  private resetDatePicker() {

    // check methods and functions of this.picker.datePicker into DOM using @VieChild
    this.picker.datePicker.setStartDate(moment());
    this.picker.datePicker.setEndDate(moment());
    console.log('to see methods and functions of this.picker.datePicker', this.picker.datePicker);
    this.picker.datePicker.element.val('');

  }

  // referred to #content into html
  openConfirmModel(content) {
    this.myErrors = [];
    console.log('reserveRental', this.newBooking);
    this.modalRef = this.modalService.open(content);
    // this.picker.datePicker;
    // debugger;
  }

  createBooking() {
    // debugger;
    console.log(this.newBooking);
    this.newBooking.rental = this.ourRental;
    this.bookingService.createYourBooking(this.newBooking).subscribe(
      (bookingData: any) => {
        this.addNewBookedOutDates(bookingData);
        this.newBooking = new Booking();
        this.modalRef.close();
        this.resetDatePicker();
        this.toastr.success('Booking has been succesfully created, check your booking detail in manage section', 'Success!');
        // debugger;
      },
      (errorsResponse: any) => {

        this.myErrors = errorsResponse.error.errors;
        console.log('myError', this.myErrors);

      }
    );
  }

  selectedDate(value: any, datepicker?: any) {
    // this is the date the iser selected
    console.log(value);

    this.options.autoUpdateInput = true;
    // any object can be passed to the selected event and it will be passed back here
    // datepicker.start = value.start;
    // datepicker.end = value.end;

    this.newBooking.startAt = this.helper.formatBookingDate(value.start);
    this.newBooking.endAt = this.helper.formatBookingDate(value.end);

    this.newBooking.days = -(value.start.diff(value.end, 'days'));
    this.newBooking.totalPrice = this.newBooking.days * this.ourRental.dailyRate;

    console.log(this.newBooking);

    // or manupulat your own internal property
    /*     this.daterange.start = value.start;
        this.daterange.end = value.end;
        this.daterange.label = value.label; */
  }

}







