"""
URL configuration for floradocREST project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.authtoken.views import obtain_auth_token
# from rest_framework.schemas import get_schema_view
from api.views import *

urlpatterns = [
    # path('openapi/', get_schema_view(), name='openapi-schema'),
    path('admin/', admin.site.urls),
    path('api/', APIView.as_view(), name='hello'),
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'),
    path("getuser/", UserDetails.as_view(), name="getuser"),
    path('signup/', SignUpView.as_view(), name='signup'),
    path('prelim/', PreliminaryDiagnosisView.as_view(), name='prelim'),
    path('chooseappointment/<int:pk>/',
         ExpertAppointmentView.as_view(), name='prelim'),
    path('allappointments/', ExpertAppointmentView.as_view(), name='allprelim'),
    path('farmerappointments/', AppointmentFarmerView.as_view(),
         name='farmerappointments'),
    path('appointmentfinish/<int:pk>/',
         BookedAppointmentExpertView.as_view(), name='appointmentcreate'),
    path('expertviewappointment/', BookedAppointmentExpertView.as_view(),
         name='expertviewappointment')
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
