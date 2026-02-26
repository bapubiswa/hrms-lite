// "use client";

// import { useEffect, useState, useCallback } from "react";
// import { Toaster } from "sonner";
// import { Plus } from "lucide-react";

// import AppShell from "@/components/app-shell";
// import Dashboard from "@/components/dashboard-stats";
// import AttendanceForm from "@/components/attendance-form";
// import AttendanceTable from "@/components/attendance-table";
// import AttendanceCalendar from "@/components/attendance-calendar";
// import AttendanceChart from "@/components/attendance-chart";

// export default function AttendancePage() {
//   const [employees, setEmployees] = useState([]);
//   const [records, setRecords] = useState([]);
//   const [summary, setSummary] = useState(null);
//   const [show, setShow] = useState(false);

//   const fetchData = useCallback(async () => {
//     try {
//       const [sumRes, empRes, attRes] = await Promise.all([
//         fetch("/api/dashboard").then((r) => r.json()),
//         fetch("/api/employees").then((r) => r.json()),
//         fetch("/api/attendance").then((r) => r.json()),
//       ]);
//       setSummary(sumRes);
//       setEmployees(empRes);
//       setRecords(attRes);
//     } catch (err) {
//       console.log("Error:", err);
//     }
//   }, []);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   return (
//     <AppShell>
//       <Toaster richColors position="top-right" />

//       <div className="mx-auto max-w-6xl">
//         {/* Dashboard Stats */}
//         <Dashboard data={summary} />

//         {/* Action Bar */}
//         <div className="mt-8 flex items-center justify-between">
//           <div>
//             <h2 className="text-xl font-semibold text-foreground">
//               Attendance Records
//             </h2>
//             <p className="mt-0.5 text-sm text-muted-foreground">
//               Track and manage daily employee attendance
//             </p>
//           </div>
//           <button
//             onClick={() => setShow(true)}
//             className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
//           >
//             <Plus className="h-4 w-4" />
//             Mark Attendance
//           </button>
//         </div>

//         {/* Modal Form */}
//         <AttendanceForm
//           employees={employees}
//           show={show}
//           onClose={() => {
//             setShow(false);
//             fetchData();
//           }}
//         />

//         {/* Table */}
//         <div className="mt-6">
//           <AttendanceTable records={records} />
//         </div>

//         {/* Calendar + Chart grid */}
//         <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
//           <AttendanceCalendar records={records} />
//           <AttendanceChart records={records} />
//         </div>
//       </div>
//     </AppShell>
//   );
// }
"use client";

import { useEffect, useState, useCallback } from "react";
import { Toaster } from "sonner";
import { Plus } from "lucide-react";

import AppShell from "@/components/app-shell";
import Dashboard from "@/components/dashboard-stats";
import AttendanceForm from "@/components/attendance-form";
import AttendanceTable from "@/components/attendance-table";
import AttendanceCalendar from "@/components/attendance-calendar";
import AttendanceChart from "@/components/attendance-chart";

export default function AttendancePage() {
  const [employees, setEmployees] = useState([]);
  const [records, setRecords] = useState([]);
  const [summary, setSummary] = useState(null);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch data from Django via Next API
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      const [sumRes, empRes, attRes] = await Promise.all([
        fetch("/api/dashboard", { cache: "no-store" }).then((r) => r.json()),
        fetch("/api/employees", { cache: "no-store" }).then((r) => r.json()),
        fetch("/api/attendance", { cache: "no-store" }).then((r) => r.json()),
      ]);

      setSummary(sumRes);
      setEmployees(empRes);
      setRecords(attRes);
    } catch (err) {
      console.error("Error loading attendance data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <AppShell>
      <Toaster richColors position="top-right" />

      <div className="mx-auto max-w-6xl">
        {/* Dashboard Stats */}
        <Dashboard data={summary} />

        {/* Header */}
        <div className="mt-8 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Attendance Records
            </h2>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Track and manage daily employee attendance
            </p>
          </div>

          <button
            onClick={() => setShow(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
          >
            <Plus className="h-4 w-4" />
            Mark Attendance
          </button>
        </div>

        {/* Modal Form */}
        <AttendanceForm
          employees={employees}
          show={show}
          onClose={() => {
            setShow(false);
            fetchData(); // refresh after marking attendance
          }}
        />

        {/* Loading */}
        {loading ? (
          <div className="mt-6 rounded-xl border border-border bg-card p-10 text-center text-muted-foreground">
            Loading attendance...
          </div>
        ) : (
          <>
            {/* Table */}
            <div className="mt-6">
              <AttendanceTable records={records} />
            </div>

            {/* Calendar + Chart */}
            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
              <AttendanceCalendar records={records} />
              <AttendanceChart records={records} />
            </div>
          </>
        )}
      </div>
    </AppShell>
  );
}