import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { UserService } from './user-service.interface';
import { Component } from '../../types';
import { DefaultUserService } from './default-user.service';
import { UserEntity, UserModel } from './user.entity';
import { UserController } from './user.controller';
import { Controller } from '../../libs/rest';


export function createUserContainer() {
  const userContainer = new Container();
  userContainer.bind<UserService>(Component.UserService).to(DefaultUserService).inSingletonScope();
  userContainer.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);
  userContainer.bind<Controller>(Component.UserController).to(UserController).inSingletonScope();

  return userContainer;
}
