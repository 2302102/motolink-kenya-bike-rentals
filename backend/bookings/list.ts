import { api } from "encore.dev/api";
import db from "../db";
import type { Booking } from "./create";

interface ListBookingsResponse {
  bookings: Booking[];
}

// Retrieves all bookings from the system.
export const list = api<void, ListBookingsResponse>(
  { expose: true, method: "GET", path: "/bookings" },
  async () => {
    const bookings: Booking[] = [];
    for await (const row of db.query<{
      id: number;
      customer_id: number;
      booking_type: string;
      item_id: number;
      start_date: Date;
      end_date: Date;
      total_price: number;
      status: string;
      notes: string | null;
    }>`
      SELECT id, customer_id, booking_type, item_id, start_date, end_date, total_price, status, notes
      FROM bookings
      ORDER BY created_at DESC
    `) {
      bookings.push({
        id: row.id,
        customerId: row.customer_id,
        bookingType: row.booking_type,
        itemId: row.item_id,
        startDate: row.start_date,
        endDate: row.end_date,
        totalPrice: row.total_price,
        status: row.status,
        notes: row.notes || undefined,
      });
    }
    return { bookings };
  }
);
