# Generated by Django 4.1.2 on 2023-04-12 08:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0008_blog_audience_blog_blog_ideas'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blog',
            name='title',
            field=models.CharField(max_length=255, null=True),
        ),
    ]
