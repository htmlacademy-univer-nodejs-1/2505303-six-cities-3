export const OfferValidationMessage = {
  title: {
    minLength: 'Minimum title length must be 10',
    maxLength: 'Maximum title length must be 100',
  },
  description: {
    minLength: 'Minimum description length must be 20',
    maxLength: 'Maximum description length must be 1024',
  },
  postDate: {
    invalidFormat: 'postDate must be a valid ISO date',
  },
  city:{
    invalidCity: 'city must be one of six'
  },
  image: {
    maxLength: 'Too short for field «image»',
    imagesCount: 'Images count must be equal 6'
  },
  type: {
    invalid: 'type must be apartment, house, room or hotel',
  },
  price: {
    invalidFormat: 'Price must be an integer',
    minValue: 'Minimum price is 100',
    maxValue: 'Maximum price is 100000',
  },
  bool:{
    invalid:'value must be a boolean'
  },
  bedrooms: {
    minValue: 'Minimum bedrooms is 1',
    maxValue: 'Maximum bedrooms is 8',
  },
  rating: {
    minValue: 'Minimum bedrooms is 1',
    maxValue: 'Maximum bedrooms is 5',
  },
  Adults: {
    minValue: 'Minimum Adults is 1',
    maxValue: 'Maximum Adults is 8',
  },
  userId: {
    invalidId: 'userId field must be a valid id',
  },
  goods:{
    invalidFormat: 'Value must be Array'
  },
  object:{
    invalidFormat: 'Value must be Object'
  }
} as const;
