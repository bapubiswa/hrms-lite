"use client";

import { useEffect, useMemo } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function AttendanceCalendar({ records }) {
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .react-calendar {
        border: none !important;
        background: transparent !important;
        font-family: inherit !important;
        width: 100% !important;
      }
      .react-calendar__navigation {
        margin-bottom: 0.5rem !important;
      }
      .react-calendar__navigation button {
        color: var(--foreground) !important;
        font-weight: 600 !important;
        font-size: 0.875rem !important;
        border-radius: 0.5rem !important;
      }
      .react-calendar__navigation button:hover,
      .react-calendar__navigation button:focus {
        background: var(--accent) !important;
      }
      .react-calendar__month-view__weekdays__weekday {
        font-size: 0.75rem !important;
        font-weight: 600 !important;
        color: var(--muted-foreground) !important;
        text-transform: uppercase !important;
      }
      .react-calendar__month-view__weekdays__weekday abbr {
        text-decoration: none !important;
      }
      .react-calendar__tile {
        border-radius: 0.5rem !important;
        font-size: 0.8rem !important;
        color: var(--foreground) !important;
        padding: 0.6rem 0.3rem !important;
      }
      .react-calendar__tile:hover {
        background: var(--accent) !important;
      }
      .react-calendar__tile--now {
        background: var(--accent) !important;
        font-weight: 700 !important;
      }
      .react-calendar__tile--active {
        background: var(--primary) !important;
        color: var(--primary-foreground) !important;
      }
      .present-day {
        background: oklch(0.85 0.15 155) !important;
        color: oklch(0.25 0.08 155) !important;
        font-weight: 600 !important;
      }
      .absent-day {
        background: oklch(0.85 0.12 27) !important;
        color: oklch(0.35 0.15 27) !important;
        font-weight: 600 !important;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const formatLocalDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const recordMap = useMemo(() => {
    const map = new Map<string, string>();
    records.forEach((r) => map.set(r.date, r.status));
    return map;
  }, [records]);

  const tileClassName = ({ date }) => {
    const formatted = formatLocalDate(date);
    const status = recordMap.get(formatted);
    if (!status) return null;
    return status === "Present" ? "present-day" : "absent-day";
  };

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Attendance Calendar
      </h3>
      <Calendar tileClassName={tileClassName} />
      <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded" style={{ background: "oklch(0.85 0.15 155)" }} />
          Present
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded" style={{ background: "oklch(0.85 0.12 27)" }} />
          Absent
        </div>
      </div>
    </div>
  );
}
