import { api, APIError } from "encore.dev/api";
import db from "../db";
import type { Tour } from "./list";

interface GetTourParams {
  id: number;
}

// Retrieves details for a specific tour package.
export const get = api<GetTourParams, Tour>(
  { expose: true, method: "GET", path: "/tours/:id" },
  async ({ id }) => {
    const row = await db.queryRow<{
      id: number;
      name: string;
      destination: string;
      description: string;
      duration_days: number;
      price: number;
      image_url: string;
      highlights: string[];
      difficulty: string;
      max_participants: number;
      available: boolean;
    }>`
      SELECT id, name, destination, description, duration_days, price, image_url,
             highlights, difficulty, max_participants, available
      FROM tours
      WHERE id = ${id}
    `;

    if (!row) {
      throw APIError.notFound("tour not found");
    }

    return {
      id: row.id,
      name: row.name,
      destination: row.destination,
      description: row.description,
      durationDays: row.duration_days,
      price: row.price,
      imageUrl: row.image_url,
      highlights: row.highlights,
      difficulty: row.difficulty,
      maxParticipants: row.max_participants,
      available: row.available,
    };
  }
);
