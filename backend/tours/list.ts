import { api } from "encore.dev/api";
import db from "../db";

export interface Tour {
  id: number;
  name: string;
  destination: string;
  description: string;
  durationDays: number;
  price: number;
  imageUrl: string;
  highlights: string[];
  difficulty: string;
  maxParticipants: number;
  available: boolean;
}

interface ListToursResponse {
  tours: Tour[];
}

// Retrieves all available tour packages.
export const list = api<void, ListToursResponse>(
  { expose: true, method: "GET", path: "/tours" },
  async () => {
    const tours: Tour[] = [];
    for await (const row of db.query<{
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
      ORDER BY duration_days ASC
    `) {
      tours.push({
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
      });
    }
    return { tours };
  }
);
