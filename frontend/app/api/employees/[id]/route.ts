// // import { updateEmployee, deleteEmployee, jsonResponse } from "@/lib/store";

// // export async function PUT(request, { params }) {
// //   const { id } = await params;
// //   const data = await request.json();
// //   const emp = updateEmployee(Number(id), data);
// //   if (!emp) return jsonResponse({ error: "Not found" }, 404);
// //   return jsonResponse(emp);
// // }

// // export async function DELETE(_request, { params }) {
// //   const { id } = await params;
// //   const ok = deleteEmployee(Number(id));
// //   if (!ok) return jsonResponse({ error: "Not found" }, 404);
// //   return jsonResponse({ message: "Deleted" });
// // }

// import { NextResponse } from "next/server";

// export async function PUT(request, { params }) {
//   try {
//     const body = await request.json();

//     const res = await fetch(
//       `http://127.0.0.1:8000/api/employees/update/${params.id}/`,
//       {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(body),
//       }
//     );

//     const data = await res.json();

//     return NextResponse.json(data, { status: res.status });
//   } catch (err) {
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }
// export async function DELETE(request, { params }) {
//   try {
//     const res = await fetch(
//       `http://127.0.0.1:8000/api/employees/delete/${params.id}/`,
//       {
//         method: "DELETE",
//       }
//     );

//     const data = await res.json();

//     return NextResponse.json(data, { status: res.status });

//   } catch (error) {
//     return NextResponse.json(
//       { error: "Delete failed" },
//       { status: 500 }
//     );
//   }
// }


  import { NextResponse } from "next/server";

  const BASE_URL = process.env.VITE_API_URL;


  //  UPDATE 
  export async function PUT(request: Request) {
    try {
      //  extract id from URL 
      const id = request.url.split("/").pop();


      if (!id) {
        return NextResponse.json(
          { error: "ID missing" },
          { status: 400 }
        );
      }

      const body = await request.json();
      
      const res = await fetch(
        `${BASE_URL}/api/employees/update/${id}/`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      const text = await res.text();
      

      return NextResponse.json(
        text ? JSON.parse(text) : { message: "Updated" },
        { status: res.status }
      );

    } catch (error) {
      

      return NextResponse.json(
        { error: "Update failed" },
        { status: 500 }
      );
    }
  }
  export async function DELETE(request: Request) {
    try {
      // ✅ extract id from URL 
      const id = request.url.split("/").pop();

      

      if (!id) {
        return NextResponse.json(
          { error: "ID missing" },
          { status: 400 }
        );
      }

      const res = await fetch(
        `${BASE_URL}/api/employees/delete/${id}/`,
        { method: "DELETE" }
      );

      const text = await res.text();
     

      if (!res.ok) {
        return NextResponse.json(
          { error: "Delete failed", details: text },
          { status: res.status }
        );
      }

      return NextResponse.json(
        { message: "Deleted successfully" },
        { status: 200 }
      );

    } catch (error) {
      console.error("DELETE ERROR:", error);

      return NextResponse.json(
        { error: "Delete failed" },
        { status: 500 }
      );
    }
  }