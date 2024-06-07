import { UserType } from './user-type.enum';

export type User = {
  email: string;
  avatarPath: string;
  name: string;
  password: string;
  userType: UserType;
};
