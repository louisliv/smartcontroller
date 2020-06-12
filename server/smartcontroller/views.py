from django.shortcuts import render
from rest_framework import viewsets, status
from .models import Node, Device
from .serializers import NodeSerializer, DeviceSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
import subprocess

# Create your views here.
class NodeViewSet(viewsets.ModelViewSet):
    queryset = Node.objects.all()
    serializer_class = NodeSerializer


class DeviceViewSet(viewsets.ModelViewSet):
    queryset = Device.objects.all()
    serializer_class = DeviceSerializer

    @action(detail=True, methods=['get'])
    def power_off(self, request, pk=None):
        device = self.get_object()
        print('here')
        test = subprocess.Popen(["tplink-smarthome-api", "setPowerState", device.ip, "false"], stdout=subprocess.PIPE)
        output = test.communicate()[0]
        print(output)

        return Response({}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['get'])
    def power_on(self, request, pk=None):
        device = self.get_object()
        test = subprocess.Popen(["tplink-smarthome-api", "setPowerState", device.ip, "true"], stdout=subprocess.PIPE)
        output = test.communicate()[0]

        return Response({}, status=status.HTTP_200_OK)
