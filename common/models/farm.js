'use strict';

module.exports = function (Farm) {

  Farm.createFakeData = function (faker) {
    return Farm.create({
      name: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
      startDate: faker.date.future(),
      endDate: faker.date.future(),
      image: faker.image.imageUrl()
    });
  }

};
