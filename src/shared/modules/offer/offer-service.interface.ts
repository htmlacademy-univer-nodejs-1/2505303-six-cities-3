import { CreateOfferDto } from './dto/create-offer.dto';
import { DocumentType } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { DocumentExists } from '../../types';

export interface OfferService extends DocumentExists{
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  find(limit?: number): Promise<DocumentType<OfferEntity>[]>;
  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;
  findPremium(limit?: number): Promise<DocumentType<OfferEntity>[]>;
  incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  findNew(count: number): Promise<DocumentType<OfferEntity>[]>;
  findDiscussed(count: number): Promise<DocumentType<OfferEntity>[]>;
  exists(documentId: string): Promise<boolean>;
  findFavorite(): Promise<DocumentType<OfferEntity>[]>;
  updateRating(offerId: string): Promise<DocumentType<OfferEntity> | null>;
}
