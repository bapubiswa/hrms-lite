import { jsonResponse } from "@/lib/store";

// GET all employees
export async function GET() {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/employees/", {
      cache: "no-store",
    });

    const data = await res.json();
    return jsonResponse(data);
  } catch (error) {
    return jsonResponse({ error: "Failed to fetch employees" }, 500);
  }
}

// ADD employee
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const res = await fetch(
      "http://127.0.0.1:8000/api/employees/add/",
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
    return jsonResponse({ error: "Failed to add employee" }, 500);
  }
}