# Generated by Django 4.1.2 on 2023-04-14 07:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0025_alter_blogcollection_slug'),
    ]

    operations = [
        migrations.AddField(
            model_name='useraccount',
            name='approve',
            field=models.BooleanField(default=True, null=True),
        ),
    ]
