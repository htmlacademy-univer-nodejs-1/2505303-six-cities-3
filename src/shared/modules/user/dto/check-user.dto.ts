import { IsEmail } from 'class-validator';
import { UserMessages } from './user.messages.js';

export class CheckUserDto {
  @IsEmail({}, {message: UserMessages.email.invalidFormat})
  public email: string;
}
