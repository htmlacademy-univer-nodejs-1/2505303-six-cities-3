import { defaultClasses, getModelForClass, prop, modelOptions } from '@typegoose/typegoose';
import { User, UserType } from '../../types';
import { createSHA256 } from '../../helpers';


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
  public avatarPath: string;

  @prop({ required: true, default: '', type: () => String })
  public firstname: string;

  @prop({ required: true, default: '', type: () => String })
  public lastname: string;

  @prop({ required: true, default: '', type: () => String })
  public password: string;

  userType: UserType;

  constructor(userData: User) {
    super();

    this.email = userData.email;
    this.avatarPath = userData.avatarPath;
    this.firstname = userData.firstname;
    this.lastname = userData.lastname;
    this.userType = userData.userType;
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
