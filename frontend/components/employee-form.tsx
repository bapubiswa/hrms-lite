"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";

const defaultForm = {
  employee_id: "",
  full_name: "",
  email: "",
  department: "",
};

export default function EmployeeForm({
  show,
  onClose,
  refresh,
  selected,
}) {
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selected) {
      setForm({
        employee_id: selected.employee_id,
        full_name: selected.full_name,
        email: selected.email,
        department: selected.department,
      });
    } else {
      setForm(defaultForm);
    }
  }, [selected]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      let res;

      if (selected) {
        // UPDATE
        res = await fetch(
          `http://127.0.0.1:8000/api/employees/update/${selected.id}/`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
          }
        );
      } else {
        // ADD
        res = await fetch(`http://127.0.0.1:8000/api/employees/add/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }

      const data = await res.json();

      // ❌ if error from backend
      if (!res.ok) {
        const errorMsg =
          data.employee_id?.[0] ||
          data.email?.[0] ||
          data.error ||
          Object.values(data)[0]?.[0] ||
          "Something went wrong";

        toast.error("❌ " + errorMsg);
        return;
      }

      // ✅ success message
      toast.success(
        selected
          ? "✅ Employee updated successfully"
          : "✅ Employee added successfully"
      );

      refresh();   // reload list
      onClose();   // close modal
      setForm(defaultForm);

    } catch (err) {
      console.error(err);
      toast.error("❌ Server error");
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  const fields = [
    { name: "employee_id", label: "Employee ID", type: "text", placeholder: "e.g. EMP009" },
    { name: "full_name", label: "Full Name", type: "text", placeholder: "e.g. John Doe" },
    { name: "email", label: "Email Address", type: "email", placeholder: "e.g. john@company.com" },
    { name: "department", label: "Department", type: "text", placeholder: "e.g. Engineering" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl shadow-primary/10">
        
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-card-foreground">
            {selected ? "Edit Employee" : "Add Employee"}
          </h3>
          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="mb-1.5 block text-sm font-medium text-card-foreground">
                {field.label}
              </label>
              <input
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                value={form[field.name]}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          ))}

          <div className="mt-2 flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              {loading
                ? "Saving..."
                : selected
                ? "Update Employee"
                : "Add Employee"}
            </button>

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-lg border border-input bg-background px-4 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}