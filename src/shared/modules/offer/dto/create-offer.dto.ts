import { IsArray, IsDateString, IsEnum, IsInt, Max, MaxLength, Min, MinLength,ArrayMaxSize,ArrayMinSize,IsBoolean,IsObject } from 'class-validator';
import { CityType, Coordinates, FacilitiesType, PlaceType, User } from '../../../types';
import { OfferValidationMessage } from './offer.messages';

export class CreateOfferDto {
  @MinLength(10, { message: OfferValidationMessage.title.minLength })
  @MaxLength(100, { message: OfferValidationMessage.title.maxLength })
  public title: string;

  @MinLength(20, { message: OfferValidationMessage.description.minLength })
  @MaxLength(1024, { message: OfferValidationMessage.description.maxLength })
  public description: string;

  @IsDateString({}, { message: OfferValidationMessage.postDate.invalidFormat })
  public postDate: Date;

  @IsEnum(CityType, { message: OfferValidationMessage.city.invalidCity })
  public city: string;

  @MaxLength(256, { message: OfferValidationMessage.image.maxLength })
  public previewImage: string;

  @ArrayMinSize(6,{ message: OfferValidationMessage.image.imagesCount })
  @ArrayMaxSize(6,{ message: OfferValidationMessage.image.imagesCount })
  public images: string[];

  @IsBoolean({message: OfferValidationMessage.bool.invalid})
  public isPremium: boolean;

  @IsBoolean({message: OfferValidationMessage.bool.invalid})
  public isFavorite: boolean;

  @Min(1, { message: OfferValidationMessage.rating.minValue})
  @Max(8, { message: OfferValidationMessage.rating.maxValue })
  public rating: number;

  @IsEnum(PlaceType, { message: OfferValidationMessage.type.invalid })
  public type: PlaceType;

  @Min(1, { message: OfferValidationMessage. bedrooms.minValue})
  @Max(8, { message: OfferValidationMessage.bedrooms.maxValue })
  public bedrooms: number;

  @Min(1, { message: OfferValidationMessage.Adults.minValue})
  @Max(10, { message: OfferValidationMessage.Adults.maxValue })
  public maxAdults: number;

  @IsInt({ message: OfferValidationMessage.price.invalidFormat })
  @Min(100, { message: OfferValidationMessage.price.minValue })
  @Max(100000, { message: OfferValidationMessage.price.maxValue })
  public price: number;

 @IsArray({ message: OfferValidationMessage.goods.invalidFormat })
  public goods: FacilitiesType[];

 @IsObject({message: OfferValidationMessage.object.invalidFormat})
 public host: User;

 @IsObject({message: OfferValidationMessage.object.invalidFormat})
 public location: Coordinates;

 public userId: string;
}
