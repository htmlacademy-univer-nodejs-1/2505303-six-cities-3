import { Expose, Type } from 'class-transformer';
import { UserRdo } from '../../user/rdo/user.rdo';
import { PlaceType,FacilitiesType,User,Coordinates } from '../../../types';

export class OfferRdo {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public postDate: string;

  @Expose()
  public city: string;

  @Expose()
  public previewImage: string;

  @Expose()
  public images: string[];

  @Expose()
  public isPremium: boolean;

  @Expose()
  public isFavorite: boolean;

  @Expose()
  public rating: number;

  @Expose()
  public type: PlaceType;

  @Expose()
  public bedrooms: number;

  @Expose()
  public maxAdults: number;

  @Expose()
  public price: number;

  @Expose()
  public goods: FacilitiesType[];

  @Expose()
  public host: User;

  @Expose()
  public commentsCount: number;

  @Expose()
  public location: Coordinates;

  @Expose({ name: 'userId'})
  @Type(() => UserRdo)
  public user: UserRdo;
}
