import { Coordinates, FacilitiesType, PlaceType, User } from '../../../types';

export class CreateOfferDto {
  public name: string;
  public description: string;
  public postDate: Date;
  public city: string;
  public imagePreview: string;
  public placeImages: string[];
  public isPremium: boolean;
  public isFavorited: boolean;
  public rating: number;
  public placeType: PlaceType;
  public countOfRooms: number;
  public countOfGuests: number;
  public rentPrice: number;
  public facilities: FacilitiesType[];
  public author: User;
  public countOfComments: number;
  public coordinates: Coordinates;
  public userId: string;
}
