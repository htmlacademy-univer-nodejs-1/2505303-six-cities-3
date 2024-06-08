import { Expose, Type,Transform } from 'class-transformer';
import { UserRdo } from '../../user/rdo/user.rdo.js';
import { OfferType,OfferGood,User,Coordinates } from '../../../types/index.js';

export class OfferRdo {
  @Expose({ name: '_id' })
  @Transform(({obj}) => obj._id.toString())
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public postDate: string;

  @Expose()

  @Expose()
  @Transform(({ obj, value }) => {
    const { latitude, longitude } = obj;
    const result = {
      name: value,
      location: {
        latitude,
        longitude,
      },
    };

    return result;
  })
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
  public type: OfferType;

  @Expose()
  public bedrooms: number;

  @Expose()
  public maxAdults: number;

  @Expose()
  public price: number;

  @Expose()
  public goods: OfferGood[];

  @Expose()
  public host: User;

  @Expose()
  public commentsCount: number;

  @Expose()
  @Transform(({ obj }) => {
    const { latitude, longitude } = obj;

    return {
      latitude,
      longitude,
    };
  })
  public location: Coordinates;

  @Expose({ name: 'userId'})
  @Type(() => UserRdo)
  public user: UserRdo;
}
