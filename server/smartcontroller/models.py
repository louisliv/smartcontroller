
from django.db import models
import subprocess

from django.core.exceptions import ValidationError
from .utils import rgb_to_hsv

from paramiko import SSHClient, AutoAddPolicy
import asyncio
import colorsys

# Create your models here.

from threading import Thread
import time
from kasa import SmartPlug, SmartBulb

class NodePowerOffThread(Thread):
    def __init__(self, node):
        Thread.__init__(self)
        self.node = node

    def run(self):
        order = [Device.PI, Device.BULB, Device.PLUG]
        devices = self.node.devices.all()

        devices = sorted(devices, key=lambda x: order.index(x.device_type))

        for device in devices:
            device.set_power_state('false')
            if device.device_type in [device.PI]:
                time.sleep(20)

def hex_to_rgb(hex):
    hex = hex.lstrip('#')
    hlen = len(hex)
    return tuple(int(hex[i:i + hlen // 3], 16) for i in range(0, hlen, hlen // 3))

class Node(models.Model):
    name = models.CharField(max_length=144)

    def __str__(self):
        return self.name

    def power_off_all(self):
        power_off_thread = NodePowerOffThread(self)
        power_off_thread.start()

    def toggle_power(self):
        plug = self.devices.filter(device_type=Device.PLUG)[0]
        
        if not plug.get_power_state():
            plug.set_power_state('true')
        else:
            self.power_off_all()

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
    username = models.CharField(
        max_length=50,
        blank=True
    )
    password = models.CharField(
        max_length=50,
        blank=True
    )

    def __str__(self):
        return '%s: %s' % (self.node.name, self.get_device_type_display())

    def set_power_state(self, power):
        if self.device_type in [self.PLUG, self.BULB]:
            device = (SmartPlug(self.ip) if self.device_type in [self.PLUG]
                else SmartBulb(self.ip))
            
            if power:
                asyncio.run(device.turn_on()) 
            else:
                asyncio.run(device.turn_off())

            asyncio.run(device.update())

        elif self.device_type in [self.PI]:
            stdin = b''
            stdout = b''
            stderr = b''
            if not power:
                client = SSHClient()
                client.set_missing_host_key_policy(AutoAddPolicy())
                client.connect(
                    self.ip, 
                    port=22, 
                    username=self.username, 
                    password=self.password
                )
                stdin_model, stdout_model, stderr_model = client.exec_command('sudo shutdown -h now')
                if stdin_model.readable():
                    stdin = stdin_model.read()
                if stdout_model.readable():
                    stdout = stdout_model.read()
                if stderr_model.readable():
                    stderr = stderr_model.read()
                
                client.close()

                return (stdin, stdout, stderr)

        return (None, None, None)

    def get_device(self):
        if self.device_type in [self.PLUG, self.BULB]:
            device = (SmartPlug(self.ip) if self.device_type in [self.PLUG]
                else SmartBulb(self.ip))
            asyncio.run(device.update())
            
            return device

        else:
            return self

    def change_color(self, color):
        if not self.device_type in [self.BULB]:
            return

        device = self.get_device()

        rgb = hex_to_rgb(color)
        hsv = rgb_to_hsv(*rgb)

        asyncio.run(device.set_hsv(*hsv))

    def get_power_state(self):
        if self.device_type in [self.PLUG, self.BULB]:
            device = (SmartPlug(self.ip) if self.device_type in [self.PLUG]
                else SmartBulb(self.ip))
            
            asyncio.run(device.update())
            
            return device.is_on

        return False

    def clean(self):
        if self.device_type in [self.PLUG]:
            plugs = self.node.devices.filter(device_type=self.PLUG)

            if plugs:
                raise ValidationError('A Node cannot have more than one plug.')