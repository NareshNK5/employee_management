from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('login/', views.login_view),
    path('employees/', views.employee_list),
    path('employees/<int:pk>/', views.employee_detail),
    path('leaves/', views.leave_list),
]