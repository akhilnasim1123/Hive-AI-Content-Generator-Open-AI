# Generated by Django 4.1.2 on 2023-04-16 11:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0038_otp_user_useraccount_email_otp'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='otp',
            name='phone_number',
        ),
    ]