import { FacilitiesType } from './facilities-type.enum';
import { Coordinates } from './offer-coordinates.type';
import { PlaceType } from './place-type.enum';
import { User } from './user.type';

export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: string;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: PlaceType;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: FacilitiesType[];
  host: User;
  commentsCount: number;
  location: Coordinates;
};
