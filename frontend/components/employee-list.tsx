"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  UserCircle,
  Building2,
  Mail,
} from "lucide-react";
import { toast } from "sonner";

export default function EmployeeList({ employees, refresh, onEdit }) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6;

const deleteEmployee = async (id) => {
     // DEBUG

  if (!id) {
    alert("ID missing!");
    return;
  }

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this employee?"
  );

  if (!confirmDelete) return;

  try {
    const res = await fetch(`/api/employees/${id}`, {
      method: "DELETE",
    });

    const text = await res.text();
   

    if (!res.ok) {
      toast.error("Delete failed");
      return;
    }

    toast.success("Employee deleted successfully");
    refresh();

  } catch (error) {
    
    toast.error("Server error");
  }
};
  const filteredEmployees = useMemo(() => {
    return employees.filter(
      (emp) =>
        emp.full_name.toLowerCase().includes(search.toLowerCase()) ||
        emp.department.toLowerCase().includes(search.toLowerCase()) ||
        emp.employee_id.toLowerCase().includes(search.toLowerCase())
    );
  }, [employees, search]);

  const lastIndex = currentPage * perPage;
  const firstIndex = lastIndex - perPage;
  const currentEmployees = filteredEmployees.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredEmployees.length / perPage);

  return (
    <div>
      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search by name, department, or ID..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full rounded-lg border border-input bg-card py-2.5 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {/* Employee Cards */}
      {currentEmployees.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {currentEmployees.map((emp) => (
            <div
              key={emp.id}
              className="group relative overflow-hidden rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:shadow-lg hover:shadow-primary/5"
            >
              {/* Top accent */}
              <div className="absolute inset-x-0 top-0 h-1 bg-primary opacity-0 transition-opacity group-hover:opacity-100" />

              {/* Avatar + Name */}
              <div className="mb-4 flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {emp.full_name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div className="min-w-0">
                  <Link
                    href={`/employee/${emp.id}`}
                    className="block truncate text-sm font-semibold text-card-foreground transition-colors hover:text-primary"
                  >
                    {emp.full_name}
                  </Link>
                  <span className="font-mono text-xs text-muted-foreground">
                    {emp.employee_id}
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="mb-4 flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Building2 className="h-3.5 w-3.5" />
                  {emp.department}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Mail className="h-3.5 w-3.5" />
                  <span className="truncate">{emp.email}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 border-t border-border pt-3">
                <Link
                  href={`/employee/${emp.id}`}
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-input bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <UserCircle className="h-3.5 w-3.5" />
                  Profile
                </Link>
                <button
                  onClick={() => onEdit(emp)}
                  className="inline-flex items-center justify-center rounded-lg border border-input bg-background p-1.5 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => deleteEmployee(emp.id)}
                  className="inline-flex items-center justify-center rounded-lg border border-input bg-background p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card py-16">
          <UserCircle className="mb-3 h-10 w-10 text-muted-foreground/40" />
          <p className="text-sm text-muted-foreground">No employees found.</p>
        </div>
      )}

      {/* Pagination */}
      {filteredEmployees.length > perPage && (
        <div className="mt-6 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Showing {firstIndex + 1}-{Math.min(lastIndex, filteredEmployees.length)}{" "}
            of {filteredEmployees.length}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => p - 1)}
              disabled={currentPage === 1}
              className="rounded-lg border border-input p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-xs font-medium text-muted-foreground">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={currentPage === totalPages}
              className="rounded-lg border border-input p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:opacity-40"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

