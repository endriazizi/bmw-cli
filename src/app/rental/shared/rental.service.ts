import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';


@Injectable()

export class RentalService {

  private rentals: any[] =
    [{
      id: 1,
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
      id: 2,
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
      id: 3,
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
      id: 4,
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
  // Private means that only our service will have access to property or function.
  // Public means that any class can reference property or function
  // public getRentals(): any[] {
  public getRentals(): any {
    debugger;
    //Instance of Observable and passing an anonimus function stand for arrow function
    const rentalObservable = new Observable((observe) => {
      //emitting some data simulate our server call, by calling some asynchronously function like setTimeout
      setTimeout(() => {
        observe.next(this.rentals);
        debugger;
      }, 1000); // after 1 seconds emitt our data

      setTimeout(() => {
        observe.error('I am an error!!!');
        debugger;
      }, 2000); // after 2 seconds emitt an error message

      setTimeout(() => {
        observe.complete();
        debugger;
      }, 3000); // after 3 seconds emitt complete method
    })
    debugger;
    // return this.rentals;
    return rentalObservable;
  }
}
