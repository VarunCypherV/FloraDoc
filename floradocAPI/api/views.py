from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser

from django.db.models import Q
from .serializers import *
from dateutil.parser import *


class HelloView(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request):
        content = {'message': 'Hello, World!'}
        return Response(content)


class SignUpView(APIView):
    serializer_class = MyUserSerializer
    permission_classes = []

    def post(self, request: Request):
        data = request.data

        serializer = self.serializer_class(data=data)

        if serializer.is_valid():
            serializer.save()

            response = {"message": "User Created Successfully",
                        "data": serializer.data}

            return Response(data=response, status=status.HTTP_201_CREATED)

        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserDetails(APIView):
    serializer_class = MyUserSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request: Request):

        user_obj = MyUser.objects.filter(user=self.request.user)
        serializer = self.serializer_class(data=user_obj, many=True)
        if serializer.is_valid():
            ...
        return Response(serializer.data)


class PreliminaryDiagnosisView(APIView):
    serializer_class = PreliminaryDiagnosisSerializer
    # permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request: Request):
        data = request.data

        serializer = self.serializer_class(
            context={'request': request}, data=data)

        if serializer.is_valid():
            serializer.save()
            response = {"message": "Preliminary Diagnosis Created",
                        "data": serializer.data, "farmer": self.request.user.username}

            return Response(data=response, status=status.HTTP_201_CREATED)

        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request: Request):

        prelims = PreliminaryDiagnosis.objects.filter(
            farmer__user=self.request.user)
        serializer = self.serializer_class(data=prelims, many=True)
        if serializer.is_valid():
            ...
        return Response(serializer.data)


class ExpertAppointmentView(APIView):
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        return Appointment.objects.get(pk=pk)

    def get(self, request: Request):
        data = request.data
        fromdatetime = parse(data['fromdatetime'])
        todatetime = parse(data['todatetime'])
        appts = Appointment.objects.filter(assigned=False).filter(
            Q(time__lte=todatetime) & Q(time__gte=fromdatetime))
        serializer = self.serializer_class(data=appts, many=True)
        if serializer.is_valid():
            ...
        return Response(serializer.data)

    def patch(self, request, pk):
        appt_object = self.get_object(pk)
        prelim = appt_object.prelim
        prelim.assigned = True
        prelim.save()
        # set partial=True to update a data partially
        serializer = AppointmentSerializer(
            appt_object, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            response = {"message": "Appointment set",
                        "data": serializer.data}
            return Response(data=response, status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AppointmentFarmerView(APIView):
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request: Request):
        data = request.data

        serializer = self.serializer_class(
            context={'request': request}, data=data)

        if serializer.is_valid():
            serializer.save()
            response = {"message": "Appointment Created",
                        "data": serializer.data}

            return Response(data=response, status=status.HTTP_201_CREATED)

        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request: Request):

        appointments = Appointment.objects.filter(
            prelim__farmer=MyUser.objects.get(user=self.request.user))
        serializer = self.serializer_class(data=appointments, many=True)
        if serializer.is_valid():
            ...
        return Response(serializer.data)

    # def patch(self, request, pk):
    #     appointment_object = self.get_object(pk)
    #     # set partial=True to update a data partially
    #     serializer = AppointmentSerializer(
    #         appointment_object, data=request.data, partial=True)
    #     if serializer.is_valid():
    #         serializer.save()
    #         response = {"message": "Appointment Updated",
    #                     "data": serializer.data}
    #         return Response(data=response, status=status.HTTP_201_CREATED)
    #     return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BookedAppointmentExpertView(APIView):
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        return Appointment.objects.get(pk=pk)

    def patch(self, request, pk):
        appointment_object = self.get_object(pk)
        # set partial=True to update a data partially
        serializer = AppointmentSerializer(
            appointment_object, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            response = {"message": "Appointment Updated",
                        "data": serializer.data}
            return Response(data=response, status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request: Request):
        appointments = Appointment.objects.filter(
            expert__user=self.request.user)
        serializer = self.serializer_class(data=appointments, many=True)
        if serializer.is_valid():
            ...
        return Response(serializer.data)
