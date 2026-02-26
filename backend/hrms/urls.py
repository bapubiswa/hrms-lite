from django.urls import path
from . import views

urlpatterns = [
    path('employees/', views.get_employees),
    path('employees/add/', views.add_employee),
    path('employees/delete/<int:pk>/', views.delete_employee),

    path('attendance/mark/', views.mark_attendance),
    path('attendance/<int:employee_id>/', views.employee_attendance),
    path('attendance/', views.get_all_attendance),
    path('employees/update/<int:pk>/', views.update_employee),
    path('dashboard/', views.dashboard_summary),
]