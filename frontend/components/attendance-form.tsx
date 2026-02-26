"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";

export default function AttendanceForm({ employees, show, onClose }) {
  const [data, setData] = useState({
    employee: "",
    date: new Date().toISOString().split("T")[0],
    status: "Present",
  });

  useEffect(() => {
    const last = localStorage.getItem("lastEmployee");
    if (last) {
      setData((prev) => ({ ...prev, employee: last }));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.employee) {
      toast.error("Please select an employee");
      return;
    }
    if (!data.date) {
      toast.error("Please select a date");
      return;
    }

    try {
      await fetch("/api/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      toast.success("Attendance saved successfully");
      localStorage.setItem("lastEmployee", data.employee);
      onClose();
    } catch {
      toast.error("Failed to save attendance");
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl shadow-primary/10">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-card-foreground">
            Mark Attendance
          </h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Employee */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-card-foreground">
              Employee
            </label>
            <select
              value={data.employee}
              onChange={(e) => setData({ ...data, employee: e.target.value })}
              className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">Select Employee</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.full_name}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-card-foreground">
              Date
            </label>
            <input
              type="date"
              value={data.date}
              onChange={(e) => setData({ ...data, date: e.target.value })}
              className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Status */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-card-foreground">
              Status
            </label>
            <div className="flex gap-3">
              {["Present", "Absent"].map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setData({ ...data, status })}
                  className={`flex-1 rounded-lg border px-4 py-2.5 text-sm font-medium transition-all
                    ${
                      data.status === status
                        ? status === "Present"
                          ? "border-success bg-success/10 text-success"
                          : "border-destructive bg-destructive/10 text-destructive"
                        : "border-input bg-background text-muted-foreground hover:bg-accent"
                    }
                  `}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-2 flex gap-3">
            <button
              type="submit"
              className="flex-1 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Save Attendance
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-input bg-background px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
