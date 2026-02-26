from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Employee, Attendance
from .serializers import EmployeeSerializer, AttendanceSerializer
from django.shortcuts import get_object_or_404
from django.utils.timezone import now
from django.db.models import Count, Q


# Add Employee
@api_view(['POST'])
def add_employee(request):
    serializer = EmployeeSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Get All Employees
@api_view(['GET'])
def get_employees(request):
    employees = Employee.objects.all().order_by('-created_at')
    serializer = EmployeeSerializer(employees, many=True)
    return Response(serializer.data)

# Update Employee
@api_view(['PUT','PATCH'])
def update_employee(request, pk):
    employee = get_object_or_404(Employee, pk=pk)
    serializer = EmployeeSerializer(
        employee,
        data=request.data,
        partial=True
    )

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=200)

    return Response(serializer.errors, status=400)

# Delete Employee
@api_view(['DELETE'])
def delete_employee(request, pk):
    employee = get_object_or_404(Employee, pk=pk)
    employee.delete()
    return Response({"message": "Employee deleted"}, status=200)


# Mark Attendance
@api_view(['POST'])
def mark_attendance(request):
    employee_id = request.data.get("employee")
    date = request.data.get("date")
    status_value = request.data.get("status")

    if not employee_id or not date or not status_value:
        return Response({"error": "All fields required"}, status=400)

    attendance, created = Attendance.objects.update_or_create(
        employee_id=employee_id,
        date=date,
        defaults={"status": status_value}
    )

    serializer = AttendanceSerializer(attendance)
    return Response(serializer.data, status=200)


# Get Attendance by Employee
@api_view(['GET'])
def employee_attendance(request, employee_id):
    records = Attendance.objects.filter(employee_id=employee_id)
    serializer = AttendanceSerializer(records, many=True)
    return Response(serializer.data)

# Get All Attendance
@api_view(['GET'])
def get_all_attendance(request):
    records = Attendance.objects.select_related('employee').order_by('-date')
    serializer = AttendanceSerializer(records, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def dashboard_summary(request):
    today = now().date()

    total_employees = Employee.objects.count()

    present_today = Attendance.objects.filter(
        date=today, status="Present"
    ).count()

    absent_today = total_employees - present_today

    percentage = 0
    if total_employees:
        percentage = round((present_today / total_employees) * 100, 2)

    return Response({
        "total_employees": total_employees,
        "present_today": present_today,
        "absent_today": absent_today,
        "attendance_percentage": percentage
    })