// import { NextResponse } from "next/server";

// // In-memory store for demo
// const employees = [
//   { id: 1, employee_id: "EMP001", full_name: "Sarah Johnson", email: "sarah@company.com", department: "Engineering" },
//   { id: 2, employee_id: "EMP002", full_name: "Michael Chen", email: "michael@company.com", department: "Design" },
//   { id: 3, employee_id: "EMP003", full_name: "Emily Davis", email: "emily@company.com", department: "Marketing" },
//   { id: 4, employee_id: "EMP004", full_name: "James Wilson", email: "james@company.com", department: "Engineering" },
//   { id: 5, employee_id: "EMP005", full_name: "Anna Martinez", email: "anna@company.com", department: "HR" },
//   { id: 6, employee_id: "EMP006", full_name: "David Brown", email: "david@company.com", department: "Finance" },
//   { id: 7, employee_id: "EMP007", full_name: "Lisa Taylor", email: "lisa@company.com", department: "Engineering" },
//   { id: 8, employee_id: "EMP008", full_name: "Robert Garcia", email: "robert@company.com", department: "Design" },
// ];

// const today = new Date().toISOString().split("T")[0];
// const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
// const dayBefore = new Date(Date.now() - 2 * 86400000).toISOString().split("T")[0];

// const attendance = [
//   { id: 1, employee: 1, employee_name: "Sarah Johnson", date: today, status: "Present" },
//   { id: 2, employee: 2, employee_name: "Michael Chen", date: today, status: "Present" },
//   { id: 3, employee: 3, employee_name: "Emily Davis", date: today, status: "Absent" },
//   { id: 4, employee: 4, employee_name: "James Wilson", date: today, status: "Present" },
//   { id: 5, employee: 5, employee_name: "Anna Martinez", date: today, status: "Present" },
//   { id: 6, employee: 6, employee_name: "David Brown", date: today, status: "Absent" },
//   { id: 7, employee: 1, employee_name: "Sarah Johnson", date: yesterday, status: "Present" },
//   { id: 8, employee: 2, employee_name: "Michael Chen", date: yesterday, status: "Present" },
//   { id: 9, employee: 3, employee_name: "Emily Davis", date: yesterday, status: "Present" },
//   { id: 10, employee: 4, employee_name: "James Wilson", date: yesterday, status: "Absent" },
//   { id: 11, employee: 5, employee_name: "Anna Martinez", date: yesterday, status: "Present" },
//   { id: 12, employee: 1, employee_name: "Sarah Johnson", date: dayBefore, status: "Present" },
//   { id: 13, employee: 2, employee_name: "Michael Chen", date: dayBefore, status: "Absent" },
//   { id: 14, employee: 3, employee_name: "Emily Davis", date: dayBefore, status: "Present" },
//   { id: 15, employee: 7, employee_name: "Lisa Taylor", date: today, status: "Present" },
//   { id: 16, employee: 8, employee_name: "Robert Garcia", date: today, status: "Present" },
// ];

// export function getEmployees() {
//   return [...employees];
// }

// export function getEmployee(id) {
//   return employees.find(e => e.id === id) || null;
// }

// export function addEmployee(data) {
//   const newEmp = { ...data, id: employees.length + 1 };
//   employees.push(newEmp);
//   return newEmp;
// }

// export function updateEmployee(id, data) {
//   const index = employees.findIndex(e => e.id === id);
//   if (index === -1) return null;
//   employees[index] = { ...employees[index], ...data };
//   return employees[index];
// }

// export function deleteEmployee(id) {
//   const index = employees.findIndex(e => e.id === id);
//   if (index === -1) return false;
//   employees.splice(index, 1);
//   return true;
// }

// export function getAttendance() {
//   return [...attendance];
// }

// export function getEmployeeAttendance(employeeId) {
//   return attendance.filter(a => a.employee === employeeId);
// }

// export function markAttendance(data) {
//   const emp = employees.find(e => e.id === Number(data.employee));
//   if (!emp) return null;
//   const record = {
//     id: attendance.length + 1,
//     employee: Number(data.employee),
//     employee_name: emp.full_name,
//     date: data.date,
//     status: data.status,
//   };
//   attendance.push(record);
//   return record;
// }

// export function getDashboard() {
//   const todayStr = new Date().toISOString().split("T")[0];
//   const todayRecords = attendance.filter(a => a.date === todayStr);
//   const presentToday = todayRecords.filter(a => a.status === "Present").length;
//   const absentToday = todayRecords.filter(a => a.status === "Absent").length;
//   const total = employees.length;
//   const percentage = total > 0 ? Math.round((presentToday / total) * 100) : 0;

//   return {
//     total_employees: total,
//     present_today: presentToday,
//     absent_today: absentToday,
//     attendance_percentage: percentage,
//   };
// }

// export function jsonResponse(data, status = 200) {
//   return NextResponse.json(data, { status });
// }
import { NextResponse } from "next/server";

export function jsonResponse(data: any, status = 200) {
  return NextResponse.json(data, { status });
}