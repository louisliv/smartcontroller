# Generated by Django 3.0.7 on 2020-06-11 23:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Node',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=144)),
            ],
        ),
        migrations.CreateModel(
            name='Device',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('device_type', models.CharField(choices=[('PI', 'Raspberry Pi'), ('PLUG', 'Smart Plug'), ('BULB', 'Smart Bulb')], default='PLUG', max_length=4)),
                ('ip', models.GenericIPAddressField()),
                ('node', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='smartcontroller.Node')),
            ],
        ),
    ]
