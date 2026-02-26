from rest_framework import serializers
from .models import Employee, Attendance

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'


class AttendanceSerializer(serializers.ModelSerializer):
    employee_name = serializers.CharField(
        source='employee.full_name',
        read_only=True
    )

    class Meta:
        model = Attendance
        fields = '__all__'
class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'
        extra_kwargs = {
            "employee_id": {
                "error_messages": {
                    "unique": "Employee ID already exists."
                }
            },
            "email": {
                "error_messages": {
                    "unique": "Email already registered."
                }
            }
        }

    # ✅ prevent duplicate on edit
    def validate(self, data):
        employee_id = data.get("employee_id")
        email = data.get("email")

        qs = Employee.objects.filter(employee_id=employee_id)
        if self.instance:
            qs = qs.exclude(id=self.instance.id)
        if qs.exists():
            raise serializers.ValidationError({
                "employee_id": "Employee ID already exists."
            })

        qs = Employee.objects.filter(email=email)
        if self.instance:
            qs = qs.exclude(id=self.instance.id)
        if qs.exists():
            raise serializers.ValidationError({
                "email": "Email already registered."
            })

        return data

    def validate(self, data):
        full_name = data.get('full_name')
        department = data.get('department')

        qs = Employee.objects.filter(
            full_name__iexact=full_name,
            department__iexact=department
        )

        # edit ke time same record ignore
        if self.instance:
            qs = qs.exclude(id=self.instance.id)

        if qs.exists():
            raise serializers.ValidationError({
                "error": "Employee already exists in this department"
            })

        return data
    
class AttendanceSerializer(serializers.ModelSerializer):
    employee_name = serializers.CharField(
        source='employee.full_name',
        read_only=True
    )

    class Meta:
        model = Attendance
        fields = '__all__'

    def validate(self, data):
        employee = data.get('employee')
        date = data.get('date')

        qs = Attendance.objects.filter(employee=employee, date=date)

        if self.instance:
            qs = qs.exclude(id=self.instance.id)

        if qs.exists():
            raise serializers.ValidationError({
                "error": "Attendance already marked for this date"
            })

        return data