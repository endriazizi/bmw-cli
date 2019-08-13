import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Rental } from './rental.model';

@Injectable()

export class RentalService {

  // private rentals: any[] =
  private rentals: Rental[] =
    [{
      _id: "1",
      title: "Central Apartment",
      city: "New York",
      street: "Times Sqaure",
      category: "apartment",
      image: "http://via.placeholder.com/350x250",
      bedrooms: 3,
      description: "Very nice apartment",
      dailyRate: 34,
      shared: false,
      createdAt: "24/12/2017"
    },
    {
      _id: "2",
      title: "Central Apartment 2",
      city: "San Francisco",
      street: "Main street",
      category: "condo",
      image: "http://via.placeholder.com/350x250",
      bedrooms: 2,
      description: "Very nice apartment",
      dailyRate: 12,
      shared: true,
      createdAt: "24/12/2017"
    },
    {
      _id: "3",
      title: "Central Apartment 3",
      city: "Bratislava",
      street: "Hlavna",
      category: "condo",
      image: "http://via.placeholder.com/350x250",
      bedrooms: 2,
      description: "Very nice apartment",
      dailyRate: 334,
      shared: true,
      createdAt: "24/12/2017"
    },
    {
      _id: "4",
      title: "Central Apartment 4",
      city: "Berlin",
      street: "Haupt strasse",
      category: "house",
      image: "http://via.placeholder.com/350x250",
      bedrooms: 9,
      description: "Very nice apartment",
      dailyRate: 33,
      shared: true,
      createdAt: "24/12/2017"
    }];


  public getRentalById(rentalId: string): Observable<Rental> {
    return new Observable<Rental>((observer) => {
      setTimeout(() => {
        const foundRental = this.rentals.find((rental) => {
          return rental._id == rentalId;
        });
        observer.next(foundRental);
      }, 500);
    });
  }

  // Private means that only our service will have access to property or function.
  // Public means that any class can reference property or function
  // public getRentals(): any[] {
  //public getRentals(): any {
  public getRentals(): Observable<Rental[]> {
    //Instance of Observable and passing an anonimus function stand for arrow function
    //const rentalObservable = new Observable((observe) => {
    // const rentalObservable: Observable<Rental[]> = new Observable((observe) => {
    return new Observable<Rental[]>((observe) => {
      //emitting some data simulate our server call, by calling some asynchronously function like setTimeout
      setTimeout(() => {
        observe.next(this.rentals);
      }, 1000); // after 1 seconds emitt our data

      setTimeout(() => {
        observe.error('I am an error!!!');
      }, 2000); // after 2 seconds emitt an error message

      setTimeout(() => {
        observe.complete();
      }, 3000); // after 3 seconds emitt complete method
    })

    // return this.rentals;
    // return rentalObservable;
  }
}
