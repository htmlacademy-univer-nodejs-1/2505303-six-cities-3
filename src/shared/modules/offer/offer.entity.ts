import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { Offer, PlaceType, FacilitiesType, Coordinates, User } from '../../types';
import { UserEntity } from '../user';


export interface OfferEntity extends defaultClasses.Base { }

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})

export class OfferEntity extends defaultClasses.TimeStamps implements Offer {
  @prop({ trim: true, required: true, type: () => String })
  public name!: string;

  @prop({ trim: true, type: () => String })
  public description!: string;

  @prop({ type: () => String })
  public postDate!: Date;

  @prop({ type: () => String })
  public city!: string;

  @prop({ type: () => String })
  public imagePreview!: string;

  @prop({ type: () => Array })
  public placeImages!: string[];

  @prop({ type: () => Boolean })
  public isPremium!: boolean;

  @prop({ type: () => Boolean })
  public isFavorited!: boolean;

  @prop({ type: () => Number })
  public rating!: number;

  @prop({
    type: () => String,
    enum: PlaceType
  })
  public placeType!: PlaceType;

  @prop({ type: () => Number })
  public countOfRooms!: number;

  @prop({ type: () => Number })
  public countOfGuests!: number;

  @prop({ type: () => Number })
  public rentPrice!: number;

  @prop({
    type: () => Array,
  })
  public facilities!: FacilitiesType[];

  @prop({
    type: () => Object,
    required: true
  })
  public author!: User;

  @prop({ default: 0, type: () => Number })
  public countOfComments!: number;

  @prop({ type: () => Object })
  public coordinates!: Coordinates;

  @prop({
    ref: UserEntity,
    required: true,
    type: () => String
  })
  public userId!: Ref<UserEntity>;

}

export const OfferModel = getModelForClass(OfferEntity);
