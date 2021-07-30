from django.shortcuts import render
from rest_framework import viewsets, status
from smartcontroller.models import Node, Device
from smartcontroller.serializers import (NodeSerializer, 
    DeviceSerializer)
from smartcontroller.utils.firetv import FireTV
from smartcontroller.utils.helpers import (get_ip_address,
    discover_devices)
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from roku import Roku

firetvs = {}

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
        device_types = [
            {'value': key, 'display': value} 
            for (key, value) 
            in Device.TYPE_CHOICES
        ]

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

    @action(detail=True, methods=['post'])
    def firetv(self, request, pk=None):
        device = self.get_object()
        ftv = firetvs.get(device.ip, None)

        if not ftv:
            ftv = FireTV(device.ip)

            firetvs[device.ip] = ftv

        ftv.update()
        
        command = request.data.get('command', None)
        argument = request.data.get('argument', None)

        if command:
            if not ftv.screen_on:
                ftv.turn_on()

            method_to_call = getattr(ftv, command)

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
        device_objs = discover_devices()

        return Response(device_objs, status=status.HTTP_200_OK)
        