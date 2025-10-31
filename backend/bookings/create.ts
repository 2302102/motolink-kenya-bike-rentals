import { api } from "encore.dev/api";
import db from "../db";

export interface CreateBookingRequest {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerId: string;
  bookingType: "bike" | "tour";
  itemId: number;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  notes?: string;
}

export interface Booking {
  id: number;
  customerId: number;
  bookingType: string;
  itemId: number;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  status: string;
  notes?: string;
}

// Creates a new booking for a bike rental or tour.
export const create = api<CreateBookingRequest, Booking>(
  { expose: true, method: "POST", path: "/bookings" },
  async (req) => {
    let customerId: number;

    const existingCustomer = await db.queryRow<{ id: number }>`
      SELECT id FROM customers WHERE email = ${req.customerEmail}
    `;

    if (existingCustomer) {
      customerId = existingCustomer.id;
    } else {
      const newCustomer = await db.queryRow<{ id: number }>`
        INSERT INTO customers (name, email, phone, id_number)
        VALUES (${req.customerName}, ${req.customerEmail}, ${req.customerPhone}, ${req.customerId})
        RETURNING id
      `;
      customerId = newCustomer!.id;
    }

    const booking = await db.queryRow<{
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
      INSERT INTO bookings (customer_id, booking_type, item_id, start_date, end_date, total_price, notes)
      VALUES (${customerId}, ${req.bookingType}, ${req.itemId}, ${req.startDate}, ${req.endDate}, ${req.totalPrice}, ${req.notes || null})
      RETURNING id, customer_id, booking_type, item_id, start_date, end_date, total_price, status, notes
    `;

    return {
      id: booking!.id,
      customerId: booking!.customer_id,
      bookingType: booking!.booking_type,
      itemId: booking!.item_id,
      startDate: booking!.start_date,
      endDate: booking!.end_date,
      totalPrice: booking!.total_price,
      status: booking!.status,
      notes: booking!.notes || undefined,
    };
  }
);
