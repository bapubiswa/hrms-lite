"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function AttendanceChart({ records }) {
  const present = records.filter((r) => r.status === "Present").length;
  const absent = records.filter((r) => r.status === "Absent").length;

  const data = [
    { name: "Present", value: present },
    { name: "Absent", value: absent },
  ];

  const COLORS = ["oklch(0.62 0.19 155)", "oklch(0.58 0.22 27)"];

  if (present === 0 && absent === 0) {
    return (
      <div className="flex items-center justify-center rounded-xl border border-border bg-card p-8">
        <p className="text-sm text-muted-foreground">No data available</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Attendance Overview
      </h3>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={90}
            innerRadius={50}
            paddingAngle={4}
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
            strokeWidth={0}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "0.75rem",
              fontSize: "0.8125rem",
              color: "var(--card-foreground)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
            }}
          />
          <Legend
            wrapperStyle={{
              fontSize: "0.8125rem",
              color: "var(--muted-foreground)",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
