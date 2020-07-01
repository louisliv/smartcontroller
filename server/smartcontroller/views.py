from django.shortcuts import render
from rest_framework import viewsets, status
from .models import Node, Device
from .serializers import NodeSerializer, DeviceSerializer
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from kasa import Discover
import asyncio
import json

# Create your views here.
class NodeViewSet(viewsets.ModelViewSet):
    queryset = Node.objects.all()
    serializer_class = NodeSerializer

    @action(detail=True, methods=['get'])
    def power_off(self, request, pk=None):
        node = self.get_object()

        node.power_off_all()

        return Response({}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['get'])
    def toggle_power(self, request, pk=None):
        node = self.get_object()

        node.toggle_power()

        return Response({}, status=status.HTTP_200_OK)

class DeviceViewSet(viewsets.ModelViewSet):
    queryset = Device.objects.all()
    serializer_class = DeviceSerializer

    @action(detail=True, methods=['get'])
    def power_off(self, request, pk=None):
        device = self.get_object()

        device.set_power_state(False)

        return Response({}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['get'])
    def power_on(self, request, pk=None):
        device = self.get_object()
       
        device.set_power_state(True)

        return Response({}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'])
    def discover(self, request):
        all_devices = Device.objects.filter(
            device_type__in=[Device.BULB, Device.PLUG])
        found_devices = asyncio.run(Discover.discover())

        for addr, dev in found_devices.items():
            asyncio.run(dev.update())

        devices = list(found_devices.values())

        device_objs = []

        for device in devices:
            check_for_existing = all_devices.filter(ip=device.host)
            if not check_for_existing:
                dev_type = Device.PLUG

                if device.is_bulb:
                    dev_type = Device.BULB

                device_objs.append({
                    "name": device.alias,
                    "ip": device.host,
                    "device_type": dev_type
                })

        return Response(device_objs, status=status.HTTP_200_OK)
        