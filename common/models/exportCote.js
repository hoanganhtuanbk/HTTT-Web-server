'use strict';

module.exports = function (ExportCote) {

  ExportCote.createFakeData = function (faker) {
    return ExportCote.create({
      name: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
      startDate: faker.date.future(),
      endDate: faker.date.future(),
      image: faker.image.imageUrl()
    });
  }

};
