const Rental = require('../models/rental');
const User = require('../models/user');


class FakeDb {
  constructor() {
    this.rentals = [{
        title: 'Apartement with view',
        city: 'Parma',
        street: 'Via Emanuelle',
        category: 'apartement',
        image: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/View_from_a_balcony_of_Albergo_Monte_Verit%C3%A0%2C_Ascona.jpg',
        description: 'Two Bedroom apartement with Balcony',
        shared: true,
        bedrooms: 2,
        dailyRate: 34

      },
      {
        title: 'Seaside Trulli',
        city: 'Bari',
        street: 'La Place',
        category: 'apartement',
        image: 'https://www.w3schools.com/html/pic_trulli.jpg',
        description: 'Two Bedroom apartement with Balcony',
        shared: true,
        bedrooms: 1,
        dailyRate: 54
      },
      {
        title: 'Nice Garden House',
        city: 'Kleve',
        street: 'Klosterweg',
        category: 'house',
        image: 'https://www.casevacanza.it/apimg/51/2337920/40068364_a5a87.jpg',
        description: 'House for 4-6 guests',
        shared: false,
        bedrooms: 3,
        dailyRate: 98
      }
      /* ,
            {
              title: 'Romantic Vacation Home',
              city: 'Nice',
              street: 'Via Nautica',
              category: 'house',
              image: 'https://images.freeimages.com/images/large-previews/85a/coast-of-southern-norway-2-1565958.jpg',
              description: 'House for 2 guests',
              bedrooms: 1,
              dailyRate: 84
            } */
    ];

    this.users = [{
      username: "Test User",
      email: "test@gmail.com",
      password: "testtest"
    }, {
      username: "Test User1",
      email: "test1@gmail.com",
      password: "testtest1"
    }]
  }




  async cleanDb() {
    // https://mongoosejs.com/docs/deprecations.html
    // await Rental.remove({});
    await User.deleteMany();
    await Rental.deleteMany();
  }

  pushDataToDb() {
    const user = new User(this.users[0]);
    const user2 = new User(this.users[1]);
    this.rentals.forEach((rental) => {
      const newRental = new Rental(rental);
      newRental.user = user; // beacuse rental model has user id reference
      // This Relationship means that these rentals belong to our user. "Test User" is owner.
      user.rentals.push(newRental);
      newRental.save();
    });
    user.save();
    user2.save();
  }



  /*   seeDb() {
      this.cleanDb();
      this.pushDataToDb();
    } */

  // to sicnronize
  async seeDb() {
    await this.cleanDb();
    this.pushDataToDb();
  }
}
module.exports = FakeDb;
