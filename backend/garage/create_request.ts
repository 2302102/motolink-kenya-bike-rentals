import { api } from "encore.dev/api";
import db from "../db";

export interface CreateGarageRequestParams {
  customerName: string;
  customerPhone: string;
  bikeModel: string;
  issueDescription: string;
  location: string;
  urgency: "low" | "medium" | "high";
}

export interface GarageRequest {
  id: number;
  customerName: string;
  customerPhone: string;
  bikeModel: string;
  issueDescription: string;
  location: string;
  urgency: string;
  status: string;
  estimatedCost?: number;
  assignedMechanic?: string;
  createdAt: Date;
}

// Creates a new garage service request.
export const createRequest = api<CreateGarageRequestParams, GarageRequest>(
  { expose: true, method: "POST", path: "/garage/requests" },
  async (req) => {
    const result = await db.queryRow<{
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
      INSERT INTO garage_requests 
        (customer_name, customer_phone, bike_model, issue_description, location, urgency)
      VALUES 
        (${req.customerName}, ${req.customerPhone}, ${req.bikeModel}, ${req.issueDescription}, ${req.location}, ${req.urgency})
      RETURNING id, customer_name, customer_phone, bike_model, issue_description, location, 
                urgency, status, estimated_cost, assigned_mechanic, created_at
    `;

    return {
      id: result!.id,
      customerName: result!.customer_name,
      customerPhone: result!.customer_phone,
      bikeModel: result!.bike_model,
      issueDescription: result!.issue_description,
      location: result!.location,
      urgency: result!.urgency,
      status: result!.status,
      estimatedCost: result!.estimated_cost || undefined,
      assignedMechanic: result!.assigned_mechanic || undefined,
      createdAt: result!.created_at,
    };
  }
);
