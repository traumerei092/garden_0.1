# Generated by Django 4.2.16 on 2024-09-23 05:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("shops", "0006_address_alter_shop_address"),
    ]

    operations = [
        migrations.AlterField(
            model_name="shop",
            name="capacity",
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
        migrations.AlterField(
            model_name="shop",
            name="seat_count",
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
    ]
