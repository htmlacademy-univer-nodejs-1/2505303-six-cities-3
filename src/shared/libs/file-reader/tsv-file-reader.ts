import { FileReader } from './file-reader.interface.js';
import { readFileSync } from 'node:fs';
import {
  Offer,
  PlaceType,
  FacilitiesType,
  UserType,
} from '../../types/index.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(private readonly filename: string) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(
        ([
          name,
          description,
          createdDate,
          city,
          imagePreview,
          placeImages,
          isPremium,
          isFavorited,
          rating,
          placeType,
          countOfRooms,
          countOfGuests,
          rentPrice,
          facilities,
          avatarPath,
          email,
          firstname,
          lastname,
          password,
          userType,
          countOfComments,
          latitude,
          longitude,
        ]) => ({
          name,
          description,
          postDate: new Date(createdDate),
          city,
          imagePreview,
          placeImages: placeImages.split(';').map((image) => image),
          isPremium: JSON.parse(isPremium),
          isFavorited: JSON.parse(isFavorited),
          rating: Number.parseInt(rating, 10),
          placeType:
            PlaceType[placeType as 'apartment' | 'house' | 'room' | 'hotel'],
          countOfRooms: Number.parseInt(countOfRooms, 10),
          countOfGuests: Number.parseInt(countOfGuests, 10),
          rentPrice: Number.parseInt(rentPrice, 10),
          facilities: facilities
            .split(';')
            .map(
              (facility) =>
                FacilitiesType[
                  facility as
                    | 'Breakfast'
                    | 'Air conditioning'
                    | 'Laptop friendly workspace'
                    | 'Baby seat'
                    | 'Washer'
                    | 'Towels'
                    | 'Fridge'
                ]
            ),

          author: {
            avatarPath,
            email,
            firstname,
            lastname,
            password,
            userType: UserType[userType as 'ordinary' | 'pro'],
          },
          countOfComments: Number.parseInt(countOfComments, 10),
          coordinates: { latitude, longitude },
        })
      );
  }
}