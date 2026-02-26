// "use client";

// import { useEffect, useState, useCallback } from "react";
// import { Toaster } from "sonner";
// import { Plus } from "lucide-react";

// import AppShell from "@/components/app-shell";
// import EmployeeList from "@/components/employee-list";
// import EmployeeForm from "@/components/employee-form";

// export default function EmployeesPage() {
//   const [employees, setEmployees] = useState([]);
//   const [show, setShow] = useState(false);
//   const [selected, setSelected] = useState(null);

//   const fetchEmployees = useCallback(async () => {
//     const res = await fetch("/api/employees");
//     const data = await res.json();
//     setEmployees(data);
//   }, []);

//   useEffect(() => {
//     fetchEmployees();
//   }, [fetchEmployees]);

//   return (
//     <AppShell>
//       <Toaster richColors position="top-right" />

//       <div className="mx-auto max-w-6xl">
//         {/* Header */}
//         <div className="mb-8 flex items-center justify-between">
//           <div>
//             <h2 className="text-xl font-semibold text-foreground">
//               Employee Management
//             </h2>
//             <p className="mt-0.5 text-sm text-muted-foreground">
//               Manage your team members and their details
//             </p>
//           </div>
//           <button
//             onClick={() => {
//               setSelected(null);
//               setShow(true);
//             }}
//             className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
//           >
//             <Plus className="h-4 w-4" />
//             Add Employee
//           </button>
//         </div>

//         {/* List */}
//         <EmployeeList
//           employees={employees}
//           refresh={fetchEmployees}
//           onEdit={(emp) => {
//             setSelected(emp);
//             setShow(true);
//           }}
//         />

//         {/* Form Modal */}
//         <EmployeeForm
//           show={show}
//           onClose={() => setShow(false)}
//           refresh={fetchEmployees}
//           selected={selected}
//         />
//       </div>
//     </AppShell>
//   );
// }


"use client";

import { useEffect, useState, useCallback } from "react";
import { Toaster } from "sonner";
import { Plus } from "lucide-react";

import AppShell from "@/components/app-shell";
import EmployeeList from "@/components/employee-list";
import EmployeeForm from "@/components/employee-form";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch employees from Django
  const fetchEmployees = useCallback(async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/employees", {
        cache: "no-store",
      });

      const data = await res.json();
      setEmployees(data);
    } catch (err) {
      console.error("Failed to load employees", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  return (
    <AppShell>
      <Toaster richColors position="top-right" />

      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Employee Management
            </h2>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Manage your team members and their details
            </p>
          </div>

          <button
            onClick={() => {
              setSelected(null);
              setShow(true);
            }}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
          >
            <Plus className="h-4 w-4" />
            Add Employee
          </button>
        </div>

        {/* Loading Skeleton */}
        {loading ? (
          <div className="rounded-xl border border-border bg-card p-10 text-center text-muted-foreground">
            Loading employees...
          </div>
        ) : (
          <EmployeeList
            employees={employees}
            refresh={fetchEmployees}
            onEdit={(emp) => {
              setSelected(emp);
              setShow(true);
            }}
          />
        )}

        {/* Form Modal */}
        <EmployeeForm
          show={show}
          onClose={() => setShow(false)}
          refresh={fetchEmployees}
          selected={selected}
        />
      </div>
    </AppShell>
  );
}