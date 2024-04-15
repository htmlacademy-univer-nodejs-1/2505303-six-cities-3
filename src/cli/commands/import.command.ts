import { Command } from './command.interface';
import { TSVFileReader } from '../../shared/libs/file-reader';
import { createOffer, getErrorMessage, getMongoURI } from '../../shared/helpers/index.js';
import { UserService } from '../../shared/modules/user/user-service.interface';
import { DefaultOfferService, OfferModel, OfferService } from '../../shared/modules/offer';
import { DatabaseClient, MongoDatabaseClient } from '../../shared/libs/database-client';
import { Logger } from '../../shared/libs/logger';
import { ConsoleLogger } from '../../shared/libs/logger/console.logger';
import { DefaultUserService, UserModel } from '../../shared/modules/user';
import { DEFAULT_DB_PORT, DEFAULT_USER_PASSWORD } from './command.constant';
import { Offer } from '../../shared/types';


export class ImportCommand implements Command {
  private userService: UserService;
  private offerService: OfferService;
  private databaseClient: DatabaseClient;
  private logger: Logger;
  private salt: string;

  constructor() {
    this.onImportedLine = this.onImportedLine.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new ConsoleLogger();
    this.offerService = new DefaultOfferService(this.logger, OfferModel);
    this.userService = new DefaultUserService(this.logger, UserModel);
    this.databaseClient = new MongoDatabaseClient(this.logger);
  }

  private async onImportedLine(line: string, resolve: () => void) {
    const offer = createOffer(line);
    await this.saveOffer(offer);
    resolve();
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
    this.databaseClient.disconnect();
  }

  private async saveOffer(offer: Offer) {
    const user = await this.userService.findOrCreate({
      ...offer.author,
      password: DEFAULT_USER_PASSWORD
    }, this.salt);


    await this.offerService.create({
      userId: user.id,
      name: offer.name,
      description: offer.description,
      postDate: offer.postDate,
      city: offer.city,
      imagePreview: offer.imagePreview,
      placeImages: offer.placeImages,
      isPremium: offer.isPremium,
      isFavorited: offer.isFavorited,
      rating: offer.rating,
      placeType: offer.placeType,
      countOfRooms: offer.countOfRooms,
      countOfGuests: offer.countOfGuests,
      rentPrice: offer.rentPrice,
      facilities: offer.facilities,
      author: offer.author,
      countOfComments: offer.countOfComments,
      coordinates: offer.coordinates,
    });

  }

  public getName(): string {
    return '--import';
  }

  public async execute(filename: string, login: string, password: string, host: string, dbname: string, salt: string): Promise<void> {
    const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT, dbname);
    this.salt = salt;

    await this.databaseClient.connect(uri);

    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      await fileReader.read();
    } catch (error) {
      console.error(`Can't import data from file: ${filename}`);
      console.error(getErrorMessage(error));
    }
  }
}
