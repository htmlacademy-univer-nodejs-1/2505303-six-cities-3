import { City } from './city.type.js';
import { OfferGood } from './facilities-type.enum.js';
import { OfferType } from './place-type.enum.js';
import { User } from './user.type.js';

export type Offer = {
  title: string,
  description: string,
  publicationDate: Date,
  city: City,
  previewImage: string,
  images: string[],
  isPremium: boolean,
  isFavorite: boolean,
  rating: number,
  price: number,
  type: OfferType,
  bedrooms: number,
  maxAdults: number,
  goods: OfferGood[],
  host: User,
  commentsCount: number,
  latitude: number,
  longitude: number,
}

