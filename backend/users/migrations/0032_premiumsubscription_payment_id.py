# Generated by Django 4.1.2 on 2023-04-14 14:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0031_premiumsubscription_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='premiumsubscription',
            name='payment_id',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
    ]