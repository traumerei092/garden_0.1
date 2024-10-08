# Generated by Django 4.2.16 on 2024-09-22 13:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("shops", "0004_shop_phone_number"),
    ]

    operations = [
        migrations.AlterField(
            model_name="shop",
            name="concepts",
            field=models.ManyToManyField(blank=True, to="shops.shopconcept"),
        ),
        migrations.AlterField(
            model_name="shop",
            name="layouts",
            field=models.ManyToManyField(blank=True, to="shops.shoplayout"),
        ),
        migrations.AlterField(
            model_name="shop",
            name="types",
            field=models.ManyToManyField(blank=True, to="shops.shoptype"),
        ),
    ]
