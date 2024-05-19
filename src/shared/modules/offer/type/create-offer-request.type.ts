import { Request } from 'express';
import { RequestBody, RequestParams } from '../../../libs/rest';
import { CreateOfferDto } from '../dto/create-offer.dto';

export type CreateOfferRequest = Request<RequestParams, RequestBody, CreateOfferDto>;
