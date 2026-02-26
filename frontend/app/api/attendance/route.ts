import { jsonResponse } from "@/lib/store";

// GET all attendance records
export async function GET() {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/attendance/", {
      cache: "no-store",
    });

    const data = await res.json();
    return jsonResponse(data);
  } catch (error) {
    return jsonResponse({ error: "Failed to fetch attendance" }, 500);
  }
}

// MARK attendance
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const res = await fetch(
      "http://127.0.0.1:8000/api/attendance/mark/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const data = await res.json();
    return jsonResponse(data, 201);
  } catch (error) {
    return jsonResponse({ error: "Failed to mark attendance" }, 500);
  }
}