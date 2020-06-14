from django.shortcuts import render
from rest_framework import viewsets, status
from .models import Node, Device
from .serializers import NodeSerializer, DeviceSerializer
from rest_framework.decorators import action
from rest_framework.response import Response

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

        device.set_power_state("false")

        return Response({}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['get'])
    def power_on(self, request, pk=None):
        device = self.get_object()
       
        device.set_power_state("true")

        return Response({}, status=status.HTTP_200_OK)
