
from django.db import models

# Create your models here.

class Node(models.Model):
    name = models.CharField(max_length=144)

    def __str__(self):
        return self.name

class Device(models.Model):
    PI = 'PI'
    PLUG = 'PLUG'
    BULB = 'BULB'
    TYPE_CHOICES = [
        (PI, 'Raspberry Pi'),
        (PLUG, 'Smart Plug'),
        (BULB, 'Smart Bulb')
    ]

    device_type=models.CharField(
        max_length=4,
        choices=TYPE_CHOICES,
        default=PLUG,
    )
    node = models.ForeignKey(Node, on_delete=models.CASCADE, related_name='devices')
    ip = models.GenericIPAddressField()

    def __str__(self):
        return '%s: %s' % (self.node.name, self.get_device_type_display())