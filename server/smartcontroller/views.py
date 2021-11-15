import asyncio
from django.shortcuts import render
from rest_framework import viewsets, status
from smartcontroller.models import Node, Device
from smartcontroller.serializers import (NodeSerializer, 
    DeviceSerializer)
from smartcontroller.utils.firetv import FireTV
from smartcontroller.utils.discover import discover
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from roku import Roku

firetvs = {}

lgtvs = {}

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

        if device.device_type == Device.STRIP:
            data = request.data
            child_id = data.get("childId", None)

            if child_id:
                kasa_device = device.get_device()
                child = list(filter(
                    lambda x: x.device_id == child_id,
                    kasa_device.children
                ))[0]

                if child.is_on:
                    asyncio.run(child.turn_off())
                else:
                    asyncio.run(child.turn_on())
            else:
                device.toggle_power_state()
        else:
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
        device_objs = discover()

        return Response(device_objs, status=status.HTTP_200_OK)
        
    @action(detail=True, methods=['get'])
    def check_registration(self, request, pk=None):
        device = self.get_object()

        registered = True if device.registered else False
        return Response({'registered': registered})
    
    @action(detail=True, methods=['post'])
    def register(self, request, pk=None):
        device = self.get_object()

        device.register()

        return Response({'registered': True})

    @action(detail=True, methods=['post'])
    def lg(self, request, pk=None):
        device = self.get_object()
        lgtv = lgtvs.get(device.ip, None)

        if not lgtv:
            try:
                lgtv = device.get_device()
            except:
                return Response(
                    { 'message': 'Device not registered' },
                    status=status.HTTP_400_BAD_REQUEST
                )
            lgtvs[device.ip] = lgtv


        command = request.data.get('command', None)
        argument = request.data.get('argument', None)
        command_type = request.data.get('type', None)

        if command:
            lgtv.execute_command(command, command_type, argument)
            return Response({}, status=status.HTTP_200_OK)
        else:
            return Response(
                { 'message': 'Please submit a command' },
                status=status.HTTP_400_BAD_REQUEST
            )

    @action(detail=True, methods=['get'])
    def get_sources(self, request, pk=None):
        device = self.get_object()
        lgtv = lgtvs.get(device.ip, None)

        if not lgtv:
            try:
                lgtv = device.get_device()
            except:
                return Response(
                    { 'message': 'Device not registered' },
                    status=status.HTTP_400_BAD_REQUEST
                )
            lgtvs[device.ip] = lgtv

        sources = lgtv.execute_command('list_sources', 'source')
        current_app_id = lgtv.execute_command('get_current', 'app')
        current_source = self.get_source_from_list_by_app_id(sources, current_app_id)

        current_source_id = None

        if current_source:
            current_source_id = current_source.data.get('id', None)

        response = {
            'sources': [x.data for x in sources],
            'current_source': current_source_id
        }

        return Response(response, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'])
    def set_source(self, request, pk=None):
        device = self.get_object()
        lgtv = lgtvs.get(device.ip, None)

        source_id = request.data.get('id')

        if not lgtv:
            try:
                lgtv = device.get_device()
            except:
                return Response(
                    { 'message': 'Device not registered' },
                    status=status.HTTP_400_BAD_REQUEST
                )
            lgtvs[device.ip] = lgtv

        sources = lgtv.execute_command('list_sources', 'source')
        source_to_select = self.get_source_from_list_by_id(sources, source_id)

        if source_to_select:
            lgtv.execute_command('set_source', 'source', source_to_select)
        else:
            return Response(
                { 'message': 'Source not found' },
                status=status.HTTP_404_NOT_FOUND
            )
        return Response({}, status=status.HTTP_200_OK)

    def get_source_from_list_by_id(self, source_list, id):
        source_to_select = None
        match = [x for x in source_list if x.data.get('id') == id]
        if match:
            source_to_select = match[0]

        return source_to_select

    def get_source_from_list_by_app_id(self, source_list, app_id):
        source_to_select = None
        match = [x for x in source_list if x.data.get('appId') == app_id]
        if match:
            source_to_select = match[0]

        return source_to_select