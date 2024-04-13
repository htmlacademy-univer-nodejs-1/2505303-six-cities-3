import { FacilitiesType } from './facilities-type.enum';
import { Coordinates } from './offer-coordinates.type';
import { PlaceType } from './place-type.enum';
import { User } from './user.type';

export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: string;
  imagePreview: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: PlaceType;
  numberRooms: number;
  numberGuests: number;
  price: number;
  conveniences: FacilitiesType[];
  author: User;
  commentsCount: number;
  coordinates: Coordinates;
};
