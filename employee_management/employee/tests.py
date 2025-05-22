from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from .models import Employee

class EmployeeTests(APITestCase):

    def test_create_employee(self):
        url = reverse('employee-list')
        data = {
            "name": "John Doe",
            "email": "john@example.com",
            "department": "HR",
            "designation": "Manager",
            "join_date": "2023-01-01"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Employee.objects.count(), 1)
        self.assertEqual(Employee.objects.get().name, "John Doe")
