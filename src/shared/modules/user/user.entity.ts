import { defaultClasses, getModelForClass, prop, modelOptions } from '@typegoose/typegoose';
import { User } from '../../types/index.js';
import { createSHA256 } from '../../helpers/index.js';


export interface UserEntity extends defaultClasses.Base { }

@modelOptions({
  schemaOptions: {
    collection: 'users'
  }
})

export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({
    unique: true, required: true, type: () => String
  })
  public email: string;

  @prop({ required: false, default: '', type: () => String })
  public avatarUrl: string;

  @prop({ required: true, default: '', type: () => String })
  public name: string;

  @prop({ required: true, default: '', type: () => String })
  public password: string;

  @prop({required: false, default: '', type: () => String })
  public isPro: string;

  constructor(userData: User) {
    super();
    this.email = userData.email;
    this.avatarUrl = userData.avatarUrl;
    this.name = userData.name;
    this.isPro = userData.isPro;
  }


  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }

  public verifyPassword(password: string, salt: string) {
    const hashPassword = createSHA256(password, salt);
    return hashPassword === this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
