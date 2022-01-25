# Generated by Django 3.2.9 on 2022-01-24 15:34

from django.db import migrations, models
import myaccount.models


class Migration(migrations.Migration):

    dependencies = [
        ('myaccount', '0002_remove_profileimage_email'),
    ]

    operations = [
        migrations.AddField(
            model_name='projectsample',
            name='profileimage',
            field=models.ImageField(default='default.png', upload_to=myaccount.models.file_path),
            preserve_default=False,
        ),
    ]