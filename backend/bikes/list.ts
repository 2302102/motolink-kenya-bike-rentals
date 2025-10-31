import { api } from "encore.dev/api";
import db from "../db";

export interface Bike {
  id: number;
  name: string;
  type: string;
  description: string;
  pricePerDay: number;
  imageUrl: string;
  features: string[];
  available: boolean;
  location: string;
}

interface ListBikesResponse {
  bikes: Bike[];
}

// Retrieves all available bikes in the inventory.
export const list = api<void, ListBikesResponse>(
  { expose: true, method: "GET", path: "/bikes" },
  async () => {
    const bikes: Bike[] = [];
    for await (const row of db.query<{
      id: number;
      name: string;
      type: string;
      description: string;
      price_per_day: number;
      image_url: string;
      features: string[];
      available: boolean;
      location: string;
    }>`
      SELECT id, name, type, description, price_per_day, image_url, features, available, location
      FROM bikes
      ORDER BY price_per_day ASC
    `) {
      bikes.push({
        id: row.id,
        name: row.name,
        type: row.type,
        description: row.description,
        pricePerDay: row.price_per_day,
        imageUrl: row.image_url,
        features: row.features,
        available: row.available,
        location: row.location,
      });
    }
    return { bikes };
  }
);
