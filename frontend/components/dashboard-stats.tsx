"use client";

import { Users, UserCheck, UserX, TrendingUp } from "lucide-react";

const cards = [
  {
    key: "total_employees",
    label: "Total Employees",
    icon: Users,
    color: "bg-primary/10 text-primary",
    iconBg: "bg-primary",
  },
  {
    key: "present_today",
    label: "Present Today",
    icon: UserCheck,
    color: "bg-success/10 text-success",
    iconBg: "bg-success",
  },
  {
    key: "absent_today",
    label: "Absent Today",
    icon: UserX,
    color: "bg-destructive/10 text-destructive",
    iconBg: "bg-destructive",
  },
  {
    key: "attendance_percentage",
    label: "Attendance Rate",
    icon: TrendingUp,
    color: "bg-warning/10 text-warning",
    iconBg: "bg-warning",
    suffix: "%",
  },
];

export default function Dashboard({ data }) {
  if (!data) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-28 animate-pulse rounded-xl border border-border bg-card"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.key}
          className="group relative overflow-hidden rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:shadow-lg hover:shadow-primary/5"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {card.label}
              </p>
              <p className="mt-2 text-3xl font-bold text-card-foreground">
                {data[card.key]}
                {card.suffix ?? ""}
              </p>
            </div>
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-lg ${card.iconBg}`}
            >
              <card.icon className="h-5 w-5 text-card" />
            </div>
          </div>
          <div
            className={`absolute bottom-0 left-0 h-1 w-full ${card.iconBg} opacity-60`}
          />
        </div>
      ))}
    </div>
  );
}
