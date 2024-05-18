import { Container } from 'inversify';
import { OfferService } from './offer-service.interface';
import { Component } from '../../types';
import { DefaultOfferService } from './default-offer.service';
import { OfferEntity, OfferModel } from './offer.entity';
import { types } from '@typegoose/typegoose';
import OfferController from './offer.controller';
import { Controller } from '../../libs/rest';

export function createOfferContainer() {
  const offerContainer = new Container();

  offerContainer.bind<OfferService>(Component.OfferService).to(DefaultOfferService);
  offerContainer.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);
  offerContainer.bind<Controller>(Component.OfferController).to(OfferController).inSingletonScope();

  return offerContainer;
}
