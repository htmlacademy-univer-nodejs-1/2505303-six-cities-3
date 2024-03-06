import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface';
import { MockServerData, PlaceType } from '../../types';
import { generateRandomValue, getRandomBool, getRandomItem, getRandomItems, } from '../../helpers';


const MIN_RATING = 1.0;
const MAX_RATING = 5.0;

const MIN_ROOMS = 1;
const MAX_ROOMS = 8;

const MIN_GUESTS = 1;
const MAX_GUESTS = 10;

const MIN_PRICE = 100;
const MAX_PRICE = 100_000;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;


export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) { }

  public generate(): string {
    const name = getRandomItem<string>(this.mockData.name);
    const description = getRandomItems<string>(this.mockData.description).join(';');
    const postDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();
    const city = getRandomItem<string>(this.mockData.cities);
    const imagePreview = getRandomItem<string>(this.mockData.imagesPreview);
    const placeImages = getRandomItems<string>(this.mockData.placesImages);
    const isPremium = getRandomBool();
    const isFavorited = getRandomBool();
    const rating = generateRandomValue(MIN_RATING, MAX_RATING).toString();
    const placeType = getRandomItem([PlaceType.apartment, PlaceType.hotel, PlaceType.house, PlaceType.room]);
    const countOfRooms = generateRandomValue(MIN_ROOMS, MAX_ROOMS).toString();
    const countOfGuests = generateRandomValue(MIN_GUESTS, MAX_GUESTS).toString();
    const rentPrice = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const facilities = getRandomItems<string>(this.mockData.facilities).join(';');
    const avatar = getRandomItem(this.mockData.avatars);
    const email = getRandomItem(this.mockData.emails);
    const author = getRandomItem(this.mockData.author);
    const password = getRandomItem(this.mockData.passwords);
    const userType = getRandomItem(this.mockData.userTypes);
    const countOfComments = generateRandomValue(0, 5).toString();
    const coordinates = getRandomItem(this.mockData.coordinates);
    const [latitude, longitude] = coordinates.split(' ');
    const [firstname, lastname] = author.split(' ');

    return [
      name, description, postDate, city,
      imagePreview, placeImages, isPremium, isFavorited, rating, placeType, countOfRooms, countOfGuests, rentPrice, facilities,
      avatar, email, firstname, lastname, password, userType, countOfComments, latitude, longitude
    ].join('\t');
  }
}
