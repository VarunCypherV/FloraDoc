from dateutil.parser import *
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from rest_framework.validators import ValidationError

from .models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password']


class MyUserSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False)

    class Meta:
        model = MyUser
        exclude = ['description', 'is_active']

    def validate(self, attrs):

        phone_exists = MyUser.objects.filter(
            phone_number=attrs["phone_number"]).exists()

        if phone_exists:
            raise ValidationError("Phone number has already been used")

        return super().validate(attrs)

    def create(self, validated_data):
        user_field = validated_data.pop("user")
        username = user_field['username']
        password = user_field['password']
        phone_number = validated_data.pop("phone_number")
        role = validated_data.pop("role")

        user = User.objects.create_user(username=username, password=password)

        Token.objects.create(user=user)

        myuser = MyUser.objects.create(
            user=user, phone_number=phone_number, role=role)

        return myuser


class DiagnosisSerializer(serializers.ModelSerializer):
    plant = serializers.CharField(max_length=30, required=False)
    disease_name = serializers.CharField(max_length=30, required=False)
    report = serializers.CharField(max_length=2000, required=False)

    class Meta:
        model = Diagnosis
        fields = '__all__'


class PreliminaryDiagnosisSerializer(serializers.ModelSerializer):
    diagnosis = DiagnosisSerializer(many=False)
    image = serializers.ImageField(required=False)

    class Meta:
        model = PreliminaryDiagnosis
        exclude = ['farmer', 'assigned', 'created']

    def create(self, validated_data):
        diagnosis_field = validated_data.pop("diagnosis")
        disease = diagnosis_field['disease_tag']
        image = validated_data.pop("image")
        diagnosis = Diagnosis.objects.get(
            disease_tag=disease)

        obj = PreliminaryDiagnosis.objects.create(diagnosis=diagnosis,
                                                  farmer=MyUser.objects.get(
                                                      user=self.context['request'].user),
                                                  image=image
                                                  )

        return obj


class AppointmentSerializer(serializers.ModelSerializer):
    prelim = PreliminaryDiagnosisSerializer(many=False)
    time = serializers.DateTimeField(format="iso-8601")

    class Meta:
        model = Appointment
        exclude = ['expert']

    def create(self, validated_data):
        prelim_field = validated_data.pop("prelim")
        diagnosis_field = prelim_field['diagnosis']
        disease = diagnosis_field['disease_tag']
        type_choices = validated_data.pop("type_choices")
        date = validated_data.pop("time")
        description_from_farmer = validated_data.pop('description_from_farmer')

        obj = Appointment.objects.create(prelim=PreliminaryDiagnosis.objects.get(
            diagnosis=Diagnosis.objects.get(disease_tag=disease), farmer=MyUser.objects.get(user=self.context['request'].user)),
            type_choices=type_choices, time=date, description_from_farmer=description_from_farmer
        )

        return obj
