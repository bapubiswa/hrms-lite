"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  Mail,
  Hash,
  CalendarDays,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Toaster } from "sonner";
import AppShell from "@/components/app-shell";

export default function EmployeeProfilePage({ params }) {
  const { id } = use(params); 

  const [employee, setEmployee] = useState(null);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  async function load() {
    try {
      const API = "http://127.0.0.1:8000/api";

      const [empRes, attRes] = await Promise.all([
        fetch(`${API}/employees/`),
        fetch(`${API}/attendance/${id}/`)
      ]);

      if (!empRes.ok || !attRes.ok) {
        toast.error("Failed to load data");
        return;
      }

      const employees = await empRes.json();
      const attendance = await attRes.json();

      const emp = employees.find(e => e.id === Number(id));

      setEmployee(emp || null);
      setRecords(attendance);

    } catch (error) {
      console.error(error);
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  }

  if (id) load();
}, [id]);

  const presentDays = records.filter(r => r.status === "Present").length;
  const absentDays = records.filter(r => r.status === "Absent").length;
  const totalDays = records.length;
  const attendanceRate =
    totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;

  return (
    <AppShell>
      <Toaster richColors position="top-right" />

      <div className="mx-auto max-w-4xl">
        {/* Back Link */}
        <Link
          href="/employees"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Employees
        </Link>

        {loading ? (
          <div className="flex flex-col gap-4">
            <div className="h-48 animate-pulse rounded-xl border border-border bg-card" />
            <div className="h-64 animate-pulse rounded-xl border border-border bg-card" />
          </div>
        ) : !employee ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card py-20">
            <p className="text-sm text-muted-foreground">
              Employee not found
            </p>
          </div>
        ) : (
          <>
            {/* Profile Card */}
            <div className="overflow-hidden rounded-xl border border-border bg-card">
              {/* Header Banner */}
              <div className="relative h-24 bg-primary/10">
                <div className="absolute -bottom-8 left-6 flex h-16 w-16 items-center justify-center rounded-xl border-4 border-card bg-primary text-lg font-bold text-primary-foreground shadow-lg">
                  {employee.full_name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </div>
              </div>

              <div className="px-6 pb-6 pt-12">
                <h2 className="text-xl font-bold text-card-foreground">
                  {employee.full_name}
                </h2>

                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="flex items-center gap-2.5 rounded-lg bg-muted/50 px-3 py-2.5">
                    <Hash className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                        Employee ID
                      </p>
                      <p className="font-mono text-sm font-medium text-card-foreground">
                        {employee.employee_id}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 rounded-lg bg-muted/50 px-3 py-2.5">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                        Department
                      </p>
                      <p className="text-sm font-medium text-card-foreground">
                        {employee.department}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 rounded-lg bg-muted/50 px-3 py-2.5">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                        Email
                      </p>
                      <p className="truncate text-sm font-medium text-card-foreground">
                        {employee.email}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Row */}
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                {
                  label: "Total Days",
                  value: totalDays,
                  icon: CalendarDays,
                  bg: "bg-primary/10",
                  text: "text-primary",
                },
                {
                  label: "Present",
                  value: presentDays,
                  icon: CheckCircle2,
                  bg: "bg-success/10",
                  text: "text-success",
                },
                {
                  label: "Absent",
                  value: absentDays,
                  icon: XCircle,
                  bg: "bg-destructive/10",
                  text: "text-destructive",
                },
                {
                  label: "Attendance",
                  value: `${attendanceRate}%`,
                  icon: CalendarDays,
                  bg: "bg-warning/10",
                  text: "text-warning",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-border bg-card p-4"
                >
                  <div className={`mb-2 inline-flex rounded-lg p-2 ${stat.bg}`}>
                    <stat.icon className={`h-4 w-4 ${stat.text}`} />
                  </div>
                  <p className="text-2xl font-bold text-card-foreground">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Attendance History */}
            <div className="mt-6 rounded-xl border border-border bg-card">
              <div className="border-b border-border px-5 py-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Attendance History
                </h3>
              </div>

              {records.length === 0 ? (
                <div className="px-5 py-12 text-center text-sm text-muted-foreground">
                  No attendance records yet
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {records.map((r) => (
                    <div
                      key={r.id}
                      className="flex items-center justify-between px-5 py-3 transition-colors hover:bg-muted/30"
                    >
                      <div className="flex items-center gap-3">
                        <CalendarDays className="h-4 w-4 text-muted-foreground" />
                        <span className="font-mono text-sm text-card-foreground">
                          {r.date}
                        </span>
                      </div>
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold
                          ${
                            r.status === "Present"
                              ? "bg-success/10 text-success"
                              : "bg-destructive/10 text-destructive"
                          }
                        `}
                      >
                        {r.status === "Present" ? (
                          <CheckCircle2 className="h-3 w-3" />
                        ) : (
                          <XCircle className="h-3 w-3" />
                        )}
                        {r.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </AppShell>
  );
}
