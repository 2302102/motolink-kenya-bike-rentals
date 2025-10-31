import { api } from "encore.dev/api";
import db from "../db";
import type { SOSRequest } from "./create_request";

interface ListSOSRequestsResponse {
  requests: SOSRequest[];
}

// Retrieves all SOS emergency requests.
export const listRequests = api<void, ListSOSRequestsResponse>(
  { expose: true, method: "GET", path: "/sos/requests" },
  async () => {
    const requests: SOSRequest[] = [];
    for await (const row of db.query<{
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
      SELECT id, name, phone, location, emergency_type, description, latitude, longitude,
             status, responder_name, response_time, created_at
      FROM sos_requests
      ORDER BY created_at DESC
    `) {
      requests.push({
        id: row.id,
        name: row.name,
        phone: row.phone,
        location: row.location,
        emergencyType: row.emergency_type,
        description: row.description,
        latitude: row.latitude || undefined,
        longitude: row.longitude || undefined,
        status: row.status,
        responderName: row.responder_name || undefined,
        responseTime: row.response_time || undefined,
        createdAt: row.created_at,
      });
    }
    return { requests };
  }
);
