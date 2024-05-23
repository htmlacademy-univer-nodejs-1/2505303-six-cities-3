import { BaseController, DocumentExistsMiddleware, HttpMethod,ValidateObjectIdMiddleware, ValidateDtoMiddleware } from '../../libs/rest';
import { inject, injectable } from 'inversify';
import { Component } from '../../types';
import { Logger } from '../../libs/logger';
import { Request, Response } from 'express';
import { OfferService } from './offer-service.interface';
import { ParamOfferId } from './type/param-offerid.type';
import { fillDTO } from '../../helpers';
import { OfferRdo } from './rdo/offer.rdo';
import { CreateOfferRequest } from './type/create-offer-request.type';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { CommentRdo, CommentService } from '../comment/index.js';
import { CreateOfferDto } from './dto/create-offer.dto';

@injectable()
export default class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
    @inject(Component.CommentService) private readonly commentService: CommentService
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController');
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ] });
    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateOfferDto)]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ] });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
    this.addRoute({
      path: '/:offerId/comments',
      method: HttpMethod.Get,
      handler: this.getComments,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ] });

    this.addRoute({
      path: '/premium',
      method: HttpMethod.Get,
      handler: this.getPremium,
    });
    this.addRoute({
      path: '/favorites',
      method: HttpMethod.Get,
      handler: this.getFavorite,
    });
    this.addRoute({
      path: '/favorites/:offerId',
      method: HttpMethod.Post,
      handler: this.updateFavorite,
      middlewares: [new ValidateObjectIdMiddleware('offerId')],
    });
    this.addRoute({
      path: '/favorites/:offerId',
      method: HttpMethod.Delete,
      handler: this.deleteFavorite,
      middlewares: [new ValidateObjectIdMiddleware('offerId')],
    });

  }

  public async show({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.findById(offerId);

    this.ok(res, fillDTO(OfferRdo, offer));

  }

  public async index(_req: Request, res: Response) {
    const offers = await this.offerService.find();
    this.ok(res, fillDTO(OfferRdo, offers));
  }

  public async create({ body }: CreateOfferRequest, res: Response): Promise<void> {
    const result = await this.offerService.create(body);
    const offer = await this.offerService.findById(result.id);
    this.created(res, fillDTO(OfferRdo, offer));
  }

  public async delete({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.deleteById(offerId);

    await this.commentService.deleteByOfferId(offerId);

    this.noContent(res, offer);
  }

  public async update({ body, params }: Request<ParamOfferId, unknown, UpdateOfferDto>, res: Response): Promise<void> {
    const updatedOffer = await this.offerService.updateById(params.offerId, body);

    this.ok(res, fillDTO(OfferRdo, updatedOffer));
  }

  public async getComments(_req: Request, _res: Response): Promise<void> {
    const comments =
      (await this.commentService.findByOfferId(_req.params['offerId'])) || [];
    const response = fillDTO(CommentRdo, comments);

    this.ok(_res, response);
  }

  public async getFavorite(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.findFavorite();
    const response = fillDTO(OfferRdo, offers);

    this.ok(res, response);
  }

  public async updateFavorite(
    { params }: Request,
    res: Response
  ): Promise<void> {
    const offers = await this.offerService.updateById(params['offerId'], {
      isFavorite: true,
    });
    const response = fillDTO(OfferRdo, offers);

    this.ok(res, response);
  }

  public async deleteFavorite(
    { params }: Request,
    res: Response
  ): Promise<void> {
    const offers = await this.offerService.updateById(params['offerId'], {
      isFavorite: false,
    });
    const response = fillDTO(OfferRdo, offers);

    this.ok(res, response);
  }

  public async getPremium(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.findPremium();
    const response = fillDTO(OfferRdo, offers);

    this.ok(res, response);
  }
}
