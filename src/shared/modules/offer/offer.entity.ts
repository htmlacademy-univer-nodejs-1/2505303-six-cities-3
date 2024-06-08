import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { Offer, OfferType, OfferGood, User, City } from '../../types/index.js';
import { UserEntity } from '../user/index.js';


export interface OfferEntity extends defaultClasses.Base { }

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})

export class OfferEntity extends defaultClasses.TimeStamps implements Offer {

  @prop({ trim: true, required: true, type: () => String })
  public title!: string;

  @prop({ trim: true, type: () => String })
  public description!: string;

  @prop({ type: () => String })
  public publicationDate!: Date;

  @prop({ type: () => String })
  public city!: City;

  @prop({ type: () => String })
  public previewImage!: string;

  @prop({ type: () => Array })
  public images!: string[];

  @prop({ type: () => Boolean })
  public isPremium!: boolean;

  @prop({ type: () => Boolean })
  public isFavorite!: boolean;

  @prop({ type: () => Number })
  public rating!: number;

  @prop({
    type: () => String,
    enum: OfferType
  })
  public type!: OfferType;

  @prop({ type: () => Number })
  public bedrooms!: number;

  @prop({ type: () => Number })
  public maxAdults!: number;

  @prop({ type: () => Number })
  public price!: number;

  @prop({
    type: () => Array,
  })
  public goods!: OfferGood[];

  @prop({
    type: () => Object,
    required: true
  })
  public host!: User;

  @prop({ default: 0, type: () => Number })
  public commentsCount!: number;

  @prop({ required: true, type: Number })
  public latitude: number;

  @prop({ required: true, type: Number })
  public longitude: number;

  @prop({
    ref: UserEntity,
    required: false,
    type: () => String
  })
  public userId!: Ref<UserEntity>;

}

export const OfferModel = getModelForClass(OfferEntity);
