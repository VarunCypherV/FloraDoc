# Generated by Django 4.2.5 on 2023-09-21 10:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_alter_appointment_expert'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='prescription',
            field=models.TextField(blank=True, default=None, null=True),
        ),
    ]
