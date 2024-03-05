import { FacilitiesType } from './facilities-type.enum';
import { Coordinates } from './offer-coordinates.type';
import { PlaceType } from './place-type.enum';
import { User } from './user.type';

export type Offer = {
  name: string;
  description: string;
  postDate: Date;
  city: string;
  imagePreview: string;
  placeImages: string[];
  isPremium: boolean;
  isFavorited: boolean;
  rating: number;
  placeType: PlaceType;
  countOfRooms: number;
  countOfGuests: number;
  rentPrice: number;
  facilities: FacilitiesType[];
  author: User;
  countOfComments: number;
  coordinates: Coordinates;
};
