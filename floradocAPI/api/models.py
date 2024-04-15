from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class MyUser(models.Model):
    user = models.OneToOneField(
        User, related_name='user_field', on_delete=models.CASCADE)
    description = models.TextField(blank=True, null=True, default=None)
    phone_number = models.CharField(max_length=10)
    is_active = models.BooleanField(default=True)
    role = models.BooleanField(default=False)  # 0 for Farmer, 1 for Expert

    def __str__(self):
        return self.user.username


class Diagnosis(models.Model):
    disease_tag = models.CharField(max_length=50)
    plant = models.CharField(max_length=30)
    disease_name = models.CharField(max_length=30)
    report = models.TextField()

    def __str__(self):
        return self.disease_tag


class PreliminaryDiagnosis(models.Model):
    image = models.ImageField(
        upload_to='images/', default=None, null=True, blank=True)
    farmer = models.ForeignKey(MyUser, on_delete=models.CASCADE)
    diagnosis = models.ForeignKey(Diagnosis, on_delete=models.CASCADE)
    assigned = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.farmer.user.username + self.diagnosis.disease_tag


class Appointment(models.Model):
    AUDIO = 1
    VIDEO = 2
    CHAT = 3
    type_choices = (
        (AUDIO, 'Audio'),
        (VIDEO, 'Video'),
        (CHAT, 'Chat')
    )

    prelim = models.OneToOneField(
        PreliminaryDiagnosis, on_delete=models.CASCADE)
    description_from_farmer = models.TextField()
    expert = models.ForeignKey(MyUser, on_delete=models.CASCADE, null=True)
    status = models.BooleanField(default=True)  # 0 for closed, 1 for open
    prescription = models.TextField(blank=True, null=True, default=None)
    # 1 for audio, 2 for video, 3 for chat
    type_choices = models.IntegerField(choices=type_choices, default=AUDIO)
    time = models.DateTimeField()

    def __str__(self):
        return self.prelim.farmer.user.username + self.prelim.diagnosis.disease_tag + self.expert.user.username
