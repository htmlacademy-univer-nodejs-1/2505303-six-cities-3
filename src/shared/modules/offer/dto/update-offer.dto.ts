import { CityType, Coordinates, PlaceType } from '../../../types';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsObject,
  IsOptional,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { OfferValidationMessage } from './offer.messages';

export class UpdateOfferDto {
  @IsOptional()
  @MinLength(10,{ message: OfferValidationMessage.title.minLength })
  @MaxLength(100, { message: OfferValidationMessage.title.maxLength })
  public title?: string;

  @IsOptional()
  @MinLength(20, { message: OfferValidationMessage.description.minLength })
  @MaxLength(1024, { message: OfferValidationMessage.description.maxLength })
  public description?: string;

  @IsOptional()
  @IsDateString({}, { message: OfferValidationMessage.postDate.invalidFormat })
  public postDate?: Date;

  @IsEnum(CityType, { message: OfferValidationMessage.city.invalidCity })
  public city?: string;

  @IsOptional()
  @MaxLength(256, { message: OfferValidationMessage.image.maxLength })
  public previewImage?: string;

  @IsOptional()
  @ArrayMinSize(6,{ message: OfferValidationMessage.image.imagesCount })
  @ArrayMaxSize(6,{ message: OfferValidationMessage.image.imagesCount })
  public images?: string[];

  @IsOptional()
  @IsBoolean({message: OfferValidationMessage.bool.invalid})
  public isPremium?: boolean;

  @IsOptional()
  @IsBoolean({message: OfferValidationMessage.bool.invalid})
  public isFavorite?: boolean;

  @IsOptional()
  @Min(1, { message: OfferValidationMessage.rating.minValue})
  @Max(8, { message: OfferValidationMessage.rating.maxValue })
  public rating?: number;

  @IsOptional()
  @IsEnum(PlaceType, { message: OfferValidationMessage.type.invalid })
  public type?: PlaceType;

  @IsOptional()
  @Min(1, { message: OfferValidationMessage. bedrooms.minValue})
  @Max(8, { message: OfferValidationMessage.bedrooms.maxValue })
  public bedrooms?: number;

  @IsOptional()
  @Min(1, { message: OfferValidationMessage.Adults.minValue})
  @Max(10, { message: OfferValidationMessage.Adults.maxValue })
  public maxAdults?: number;

  @IsOptional()
  @IsInt({ message: OfferValidationMessage.price.invalidFormat })
  @Min(100, { message: OfferValidationMessage.price.minValue })
  @Max(100000, { message: OfferValidationMessage.price.maxValue })
  public price?: number;

  @IsOptional()
  @IsArray({ message: OfferValidationMessage.goods.invalidFormat })
  public goods?: string[];

  @IsOptional()
  @IsObject({message: OfferValidationMessage.object.invalidFormat})
  public location?: Coordinates;
}
