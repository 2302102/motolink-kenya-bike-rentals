import { api, APIError } from "encore.dev/api";
import db from "../db";
import type { Bike } from "./list";

interface GetBikeParams {
  id: number;
}

// Retrieves details for a specific bike.
export const get = api<GetBikeParams, Bike>(
  { expose: true, method: "GET", path: "/bikes/:id" },
  async ({ id }) => {
    const row = await db.queryRow<{
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
      WHERE id = ${id}
    `;

    if (!row) {
      throw APIError.notFound("bike not found");
    }

    return {
      id: row.id,
      name: row.name,
      type: row.type,
      description: row.description,
      pricePerDay: row.price_per_day,
      imageUrl: row.image_url,
      features: row.features,
      available: row.available,
      location: row.location,
    };
  }
);
