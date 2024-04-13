import { Coordinates, FacilitiesType, PlaceType, User } from '../../../types';

export class CreateOfferDto {
  public title: string;
  public description: string;
  public postDate: Date;
  public city: string;
  public imagePreview: string;
  public images: string[];
  public isPremium: boolean;
  public isFavorite: boolean;
  public rating: number;
  public type: PlaceType;
  public numberRooms: number;
  public numberGuests: number;
  public price: number;
  public conveniences: FacilitiesType[];
  public author: User;
  public commentsCount: number;
  public coordinates: Coordinates;
  public userId: string;
}
