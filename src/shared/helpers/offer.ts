import {
  Offer,
  PlaceType,
  FacilitiesType,
  UserType,
} from '../types';

export function createOffer(offerData: string): Offer {

  if (!offerData.trim().length) {
    throw new Error('Can\'t import data from file');
  }
  const [
    name,
    description,
    createdDate,
    city,
    imagePreview,
    placeImages,
    isPremium,
    isFavorited,
    rating,
    placeType,
    countOfRooms,
    countOfGuests,
    rentPrice,
    facilities,
    avatarPath,
    email,
    firstname,
    lastname,
    password,
    userType,
    countOfComments,
    latitude,
    longitude,
  ] = offerData.replace('\n', '').split('\t');

  const offer: Offer = {
    name,
    description,
    postDate: new Date(createdDate),
    city,
    imagePreview,
    placeImages: placeImages.split(';').map((image) => image),
    isPremium: JSON.parse(isPremium),
    isFavorited: JSON.parse(isFavorited),
    rating: Number.parseInt(rating, 10),
    placeType:
      PlaceType[placeType as 'apartment' | 'house' | 'room' | 'hotel'],
    countOfRooms: Number.parseInt(countOfRooms, 10),
    countOfGuests: Number.parseInt(countOfGuests, 10),
    rentPrice: Number.parseInt(rentPrice, 10),
    facilities: facilities
      .split(';')
      .map(
        (facility) =>
          FacilitiesType[
          facility as
          | 'Breakfast'
          | 'Air conditioning'
          | 'Laptop friendly workspace'
          | 'Baby seat'
          | 'Washer'
          | 'Towels'
          | 'Fridge'
          ]
      ),

    author: {
      avatarPath,
      email,
      firstname,
      lastname,
      password,
      userType: UserType[userType as 'ordinary' | 'pro'],
    },
    countOfComments: Number.parseInt(countOfComments, 10),
    coordinates: { latitude, longitude },
  };
  return offer;


}
