'use strict';

module.exports = function (Food) {

  Food.createFakeData = function (faker) {
    return Food.create({
      name: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
      startDate: faker.date.future(),
      endDate: faker.date.future(),
      image: faker.image.imageUrl()
    });
  }

};
