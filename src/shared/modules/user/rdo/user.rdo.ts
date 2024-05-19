import { Expose } from 'class-transformer';
import { UserType } from '../../../types';

export class UserRdo {
  @Expose()
  public email: string ;

  @Expose()
  public avatarPath: string;

  @Expose()
  public firstname: string;

  @Expose()
  public lastname: string;

  @Expose()
  public userType: UserType;
}
