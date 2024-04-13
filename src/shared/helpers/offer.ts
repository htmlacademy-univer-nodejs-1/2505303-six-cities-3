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
    title: name,
    description,
    postDate: new Date(createdDate),
    city,
    imagePreview,
    images: placeImages.split(';').map((image) => image),
    isPremium: JSON.parse(isPremium),
    isFavorite: JSON.parse(isFavorited),
    rating: Number.parseInt(rating, 10),
    type:
      PlaceType[placeType as 'apartment' | 'house' | 'room' | 'hotel'],
    numberRooms: Number.parseInt(countOfRooms, 10),
    numberGuests: Number.parseInt(countOfGuests, 10),
    price: Number.parseInt(rentPrice, 10),
    conveniences: facilities
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
    commentsCount: Number.parseInt(countOfComments, 10),
    coordinates: { latitude, longitude },
  };
  return offer;


}
