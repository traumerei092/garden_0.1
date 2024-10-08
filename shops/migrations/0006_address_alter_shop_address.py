# Generated by Django 4.2.16 on 2024-09-23 04:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("shops", "0005_alter_shop_concepts_alter_shop_layouts_and_more"),
    ]

    operations = [
        migrations.CreateModel(
            name="Address",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("postal_code", models.CharField(max_length=10)),
                ("prefecture", models.CharField(max_length=50)),
                ("city", models.CharField(max_length=50)),
                ("district", models.CharField(blank=True, max_length=50)),
                ("town", models.CharField(max_length=50)),
                ("street_address", models.CharField(max_length=100)),
                ("building", models.CharField(blank=True, max_length=100)),
            ],
        ),
        migrations.AlterField(
            model_name="shop",
            name="address",
            field=models.OneToOneField(
                on_delete=django.db.models.deletion.CASCADE, to="shops.address"
            ),
        ),
    ]
