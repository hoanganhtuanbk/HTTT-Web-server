'use strict';

module.exports = function (Dan) {

  Dan.createFakeData = function (faker) {
    return Dan.create({
      name: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
      startDate: faker.date.future(),
      endDate: faker.date.future(),
      image: faker.image.imageUrl()
    });
  }

};
