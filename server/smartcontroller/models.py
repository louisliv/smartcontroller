
import asyncio
import colorsys
import getpass
import re
import subprocess
import time

from django.core.exceptions import ValidationError
from django.db import models
from kasa import SmartPlug, SmartBulb
from roku import Roku
from threading import Thread

from smartcontroller.utils import rgb_to_hsv, hex_to_rgb, execute_os_command


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


class Node(models.Model):
    name = models.CharField(max_length=144)

    def power_off_all(self):
        power_off_thread = NodePowerOffThread(self)
        power_off_thread.start()

    def toggle_power(self):
        plug = self.devices.filter(device_type=Device.PLUG)[0]
        
        if not plug.get_power_state():
            plug.set_power_state('true')
        else:
            self.power_off_all()

    def __str__(self):
        return self.name


class Device(models.Model):
    PI = 'PI'
    PLUG = 'PLUG'
    BULB = 'BULB'
    LINUX = 'LINUX'
    PC = 'PC'
    ROKU = 'ROKU'
    AMZN = 'AMZN'
    TYPE_CHOICES = [
        (PI, 'Raspberry Pi'),
        (PLUG, 'Smart Plug'),
        (BULB, 'Smart Bulb'),
        (LINUX, 'Linux'),
        (PC, 'PC'),
        (ROKU, 'Roku'),
        (AMZN, 'Amazon FireTv')
    ]

    device_type=models.CharField(
        max_length=5,
        choices=TYPE_CHOICES,
        default=PLUG,
    )
    mac = models.CharField(
        max_length=100,
        blank=True
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

        elif self.device_type in [self.PI, self.LINUX]:
            
            if not power:
                return execute_os_command(self, 'sudo -S shutdown -h now')

        elif self.device_type in [self.ROKU]:
            roku = Roku(self.ip)
            roku.power()

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
            raise ValidationError(
                'This device\'s color cannot be changed.'
            )

        device = self.get_device()

        rgb = hex_to_rgb(color)
        hsv = rgb_to_hsv(*rgb)

        asyncio.run(device.set_hsv(*hsv))

    def change_brightness(self, brightness):
        if not self.device_type in [self.BULB]:
            raise ValidationError(
                'This device\'s brightness cannot be changed.'
            )

        device = self.get_device()

        asyncio.run(device.set_brightness(int(brightness)))

    def get_power_state(self):
        if self.device_type in [self.PLUG, self.BULB]:
            device = (SmartPlug(self.ip) if self.device_type in [self.PLUG]
                else SmartBulb(self.ip))
            
            asyncio.run(device.update())
            
            return device.is_on

        if self.device_type in [self.ROKU]:
            roku = Roku(self.ip)
            return roku.power_state

        return False

    def toggle_power_state(self):
        state = self.get_power_state()

        return self.set_power_state(not state)

    def clean(self):
        if self.device_type in [self.PLUG]:
            plugs = self.node.devices.filter(device_type=self.PLUG)

            if plugs:
                raise ValidationError('A Node cannot have more than one plug.')
