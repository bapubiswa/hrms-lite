"use client";

import { useState } from "react";
import {
  Search,
  Download,
  ChevronLeft,
  ChevronRight,
  FileSpreadsheet,
} from "lucide-react";

export default function AttendanceTable({ records }) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  const filteredRecords = records.filter(
    (r) =>
      r.employee_name.toLowerCase().includes(search.toLowerCase()) ||
      r.status.toLowerCase().includes(search.toLowerCase()) ||
      r.date.includes(search)
  );

  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;
  const currentRecords = filteredRecords.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

  const exportCSV = () => {
    if (!filteredRecords.length) return;
    const headers = ["Employee", "Date", "Status"];
    const rows = filteredRecords.map((r) => [
      `"${r.employee_name}"`,
      `="${r.date}"`,
      `"${r.status}"`,
    ]);
    const csvContent =
      headers.join(",") + "\n" + rows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "attendance.csv";
    link.click();
  };

  if (records.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card py-16">
        <FileSpreadsheet className="mb-3 h-10 w-10 text-muted-foreground/40" />
        <p className="text-sm text-muted-foreground">No attendance records yet</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card">
      {/* Header Bar */}
      <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search records..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full rounded-lg border border-input bg-background py-2 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 sm:w-72"
          />
        </div>

        <button
          onClick={exportCSV}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Download className="h-4 w-4" />
          Export CSV
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Employee
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {currentRecords.map((rec) => (
              <tr
                key={rec.id}
                className="transition-colors hover:bg-muted/30"
              >
                <td className="px-4 py-3 text-sm font-medium text-card-foreground">
                  {rec.employee_name}
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground font-mono">
                  {rec.date}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold
                      ${
                        rec.status === "Present"
                          ? "bg-success/10 text-success"
                          : "bg-destructive/10 text-destructive"
                      }
                    `}
                  >
                    {rec.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-border px-4 py-3">
          <p className="text-xs text-muted-foreground">
            Showing {indexOfFirst + 1}-{Math.min(indexOfLast, filteredRecords.length)}{" "}
            of {filteredRecords.length}
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
