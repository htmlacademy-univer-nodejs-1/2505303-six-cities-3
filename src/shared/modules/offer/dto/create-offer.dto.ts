import { Coordinates, FacilitiesType, PlaceType, User } from '../../../types';

export class CreateOfferDto {
  public title: string;
  public description: string;
  public postDate: Date;
  public city: string;
  public previewImage: string;
  public images: string[];
  public isPremium: boolean;
  public isFavorite: boolean;
  public rating: number;
  public type: PlaceType;
  public bedrooms: number;
  public maxAdults: number;
  public price: number;
  public goods: FacilitiesType[];
  public host: User;
  public commentsCount: number;
  public location: Coordinates;
  public userId: string;
}
