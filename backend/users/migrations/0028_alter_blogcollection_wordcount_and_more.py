# Generated by Django 4.1.2 on 2023-04-14 07:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0027_alter_blogcollection_wordcount_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blogcollection',
            name='wordCount',
            field=models.IntegerField(blank=True, default=0),
        ),
        migrations.AlterField(
            model_name='blogideasave',
            name='wordCount',
            field=models.IntegerField(blank=True, default=0),
        ),
        migrations.AlterField(
            model_name='blogsection',
            name='wordCount',
            field=models.IntegerField(blank=True, default=0),
        ),
        migrations.AlterField(
            model_name='storydetails',
            name='wordCount',
            field=models.IntegerField(blank=True, default=0),
        ),
    ]