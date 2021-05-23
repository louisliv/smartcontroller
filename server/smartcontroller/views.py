from django.shortcuts import render
from rest_framework import viewsets, status
from .models import Node, Device
from .serializers import NodeSerializer, DeviceSerializer
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from kasa import Discover
from roku import Roku
import asyncio
import json
import nmap
import socket

def get_ip_address():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    s.connect(("8.8.8.8", 80))
    return s.getsockname()[0]

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

    @action(detail=False, methods=['get'])
    def types(self, request):
        device_types = [{'value': key, 'display': value} for (key, value) in Device.TYPE_CHOICES]

        return Response(device_types, status=status.HTTP_200_OK)

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

    @action(detail=True, methods=['post'])
    def power(self, request, pk=None):
        device = self.get_object()
       
        device.toggle_power_state()

        return Response({}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'])
    def change_color(self, request, pk=None):
        device = self.get_object()

        device.change_color(request.data.get('color', None))

        return Response({}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'])
    def change_brightness(self, request, pk=None):
        device = self.get_object()

        device.change_brightness(request.data.get('brightness', None))

        return Response({}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'])
    def roku(self, request, pk=None):
        device = self.get_object()
        roku = Roku(device.ip)
        
        command = request.data.get('command', None)
        argument = request.data.get('argument', None)

        if command:
            method_to_call = getattr(roku, command)

            if argument:
                method_to_call(argument)
            else:
                method_to_call()
        
            return Response({}, status=status.HTTP_200_OK)
        else:
            return Response(
                { 'message': 'Please submit a command' },
                status=status.HTTP_400_BAD_REQUEST
            )

    @action(detail=False, methods=['get'])
    def discover(self, request):
        nm = nmap.PortScanner()
        all_devices = Device.objects.all()

        ip = get_ip_address()

        ip_nums = ip.split('.')
        ip_nums[-1] = '0'

        print(ip_nums)

        search_ip = '.'.join(ip_nums) + '/24'

        found_devices = nm.scan(search_ip, arguments="-sP")

        device_objs = []

        for device in nm.all_hosts():
            if device != ip:
                mac = nm[device]['addresses'].get('mac', None)
                vendor = nm[device]['vendor'].get(mac, None)
                check_for_existing = all_devices.filter(mac=mac)

                if not check_for_existing:
                    device_objs.append({
                        "vendor": vendor,
                        "ip": device,
                        "mac": mac
                    })
                else:
                    dev = check_for_existing[0]
                    device_objs.append({
                        "id": dev.pk,
                        "vendor": vendor,
                        "ip": device,
                        "mac": mac
                    })

        return Response(device_objs, status=status.HTTP_200_OK)
        