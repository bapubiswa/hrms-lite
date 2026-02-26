// import { getDashboard, jsonResponse } from "@/lib/store";

// export async function GET() {
//   return jsonResponse(getDashboard());
// }
import { jsonResponse } from "@/lib/store";

export async function GET() {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/dashboard/", {
      cache: "no-store", // always fresh data
    });

    const data = await res.json();
    return jsonResponse(data);
  } catch (error) {
    return jsonResponse(
      { error: "Failed to fetch dashboard data" },
      500
    );
  }
}