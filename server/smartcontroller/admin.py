from django.contrib import admin
from .models import Node, Device
from .forms import DeviceForm

class DeviceAdmin(admin.ModelAdmin):
    form = DeviceForm

# Register your models here.
admin.site.register(Node)
admin.site.register(Device, DeviceAdmin)