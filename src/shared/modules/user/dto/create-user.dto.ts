
import { IsEmail, IsString, Length,IsOptional,IsUrl } from 'class-validator';
import { UserMessages } from './user.messages.js';

export class CreateUserDto {
  @IsEmail({}, { message: UserMessages.email.invalidFormat })
  public email: string;

  @IsString({ message: UserMessages.name.invalidFormat })
  @Length(1, 15, { message: UserMessages.name.lengthField })
  public name: string;

  @IsOptional()
  @IsUrl({}, { message: UserMessages.avatarUrl.invalidFormat })
  public avatarUrl?: string;

  @IsString({ message: UserMessages.password.invalidFormat })
  @Length(6, 12, { message: UserMessages.password.lengthField })
  public password: string;

  public isPro: string;
}
