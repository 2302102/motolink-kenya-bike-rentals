import { api } from "encore.dev/api";
import db from "../db";

export interface CreateSOSRequestParams {
  name: string;
  phone: string;
  location: string;
  emergencyType: "breakdown" | "accident" | "medical" | "security" | "other";
  description: string;
  latitude?: number;
  longitude?: number;
}

export interface SOSRequest {
  id: number;
  name: string;
  phone: string;
  location: string;
  emergencyType: string;
  description: string;
  latitude?: number;
  longitude?: number;
  status: string;
  responderName?: string;
  responseTime?: Date;
  createdAt: Date;
}

// Creates a new SOS emergency request.
export const createRequest = api<CreateSOSRequestParams, SOSRequest>(
  { expose: true, method: "POST", path: "/sos/requests" },
  async (req) => {
    const result = await db.queryRow<{
      id: number;
      name: string;
      phone: string;
      location: string;
      emergency_type: string;
      description: string;
      latitude: number | null;
      longitude: number | null;
      status: string;
      responder_name: string | null;
      response_time: Date | null;
      created_at: Date;
    }>`
      INSERT INTO sos_requests 
        (name, phone, location, emergency_type, description, latitude, longitude)
      VALUES 
        (${req.name}, ${req.phone}, ${req.location}, ${req.emergencyType}, ${req.description}, 
         ${req.latitude || null}, ${req.longitude || null})
      RETURNING id, name, phone, location, emergency_type, description, latitude, longitude,
                status, responder_name, response_time, created_at
    `;

    return {
      id: result!.id,
      name: result!.name,
      phone: result!.phone,
      location: result!.location,
      emergencyType: result!.emergency_type,
      description: result!.description,
      latitude: result!.latitude || undefined,
      longitude: result!.longitude || undefined,
      status: result!.status,
      responderName: result!.responder_name || undefined,
      responseTime: result!.response_time || undefined,
      createdAt: result!.created_at,
    };
  }
);
