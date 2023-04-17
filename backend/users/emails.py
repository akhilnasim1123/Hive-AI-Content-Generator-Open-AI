from django.core.mail import send_mail
import random
from django.conf import settings
from .models import OTP, UserAccount


def sent_otp_via_email(email):
    subject = 'Account Login Through Email Address'
    otp = random.randint(1000,9999)
    message = f'Your OTP is {otp}'
    email_from = settings.EMAIL_HOST
    send_mail(subject, message, email_from,[email])
    user = UserAccount.objects.get(email=email)
    otp_registration = OTP.objects.create(
        user = user,
        otp = otp,
    )
    otp_registration.save()
    user.email_otp = otp
    user.save()
    return otp
    