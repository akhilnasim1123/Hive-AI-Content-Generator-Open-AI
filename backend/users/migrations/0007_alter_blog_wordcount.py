# Generated by Django 4.1.2 on 2023-04-10 05:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0006_blog_blogsection'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blog',
            name='wordCount',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
