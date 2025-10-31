import { api } from "encore.dev/api";
import db from "../db";
import type { GarageRequest } from "./create_request";

interface ListGarageRequestsResponse {
  requests: GarageRequest[];
}

// Retrieves all garage service requests.
export const listRequests = api<void, ListGarageRequestsResponse>(
  { expose: true, method: "GET", path: "/garage/requests" },
  async () => {
    const requests: GarageRequest[] = [];
    for await (const row of db.query<{
      id: number;
      customer_name: string;
      customer_phone: string;
      bike_model: string;
      issue_description: string;
      location: string;
      urgency: string;
      status: string;
      estimated_cost: number | null;
      assigned_mechanic: string | null;
      created_at: Date;
    }>`
      SELECT id, customer_name, customer_phone, bike_model, issue_description, location,
             urgency, status, estimated_cost, assigned_mechanic, created_at
      FROM garage_requests
      ORDER BY created_at DESC
    `) {
      requests.push({
        id: row.id,
        customerName: row.customer_name,
        customerPhone: row.customer_phone,
        bikeModel: row.bike_model,
        issueDescription: row.issue_description,
        location: row.location,
        urgency: row.urgency,
        status: row.status,
        estimatedCost: row.estimated_cost || undefined,
        assignedMechanic: row.assigned_mechanic || undefined,
        createdAt: row.created_at,
      });
    }
    return { requests };
  }
);
