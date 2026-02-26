// import { NextResponse } from "next/server";

// export async function GET(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const res = await fetch(
//       `http://localhost:8000/api/attendance/${params.id}/`,
//       {
//         method: "GET",
//         headers: { "Content-Type": "application/json" },
//         cache: "no-store",
//       }
//     );

//     if (!res.ok) {
//       return NextResponse.json(
//         { error: "Django returned error", status: res.status },
//         { status: res.status }
//       );
//     }

//     const data = await res.json();
//     return NextResponse.json(data);

//   } catch (error) {
//     console.error("SERVER FETCH ERROR:", error);

//     return NextResponse.json(
//       { error: "Failed to fetch attendance" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";

const BASE_URL = process.env.VITE_API_URL;

export async function GET(request: Request) {
  try {
    //  extract id safely from URL
    const id = request.url.split("/").pop();

   
    if (!id) {
      return NextResponse.json(
        { error: "Employee ID missing" },
        { status: 400 }
      );
    }

    const res = await fetch(
      `${BASE_URL}/api/attendance/${id}/`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      const text = await res.text();
      
      return NextResponse.json(
        { error: "Django returned error" },
        { status: res.status }
      );
    }

    const data = await res.json();

    return NextResponse.json(data);

  } catch (error) {
    

    return NextResponse.json(
      { error: "Failed to fetch attendance" },
      { status: 500 }
    );
  }
}