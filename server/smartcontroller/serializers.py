from django.db.models import fields
from rest_framework import serializers
from .models import Node, Device
from.utils.globals import KASA_ENUM


class SmartStripPlugSerializer(serializers.Serializer):
    alias = serializers.CharField(max_length=200)
    device_id = serializers.CharField(max_length=200)
    device_type = serializers.SerializerMethodField()

    def get_device_type(self, obj):
        return KASA_ENUM[obj.device_type.name]

class DeviceSerializer(serializers.ModelSerializer):
    device_type_display = serializers.SerializerMethodField()
    display_name = serializers.SerializerMethodField()
    children = serializers.SerializerMethodField()

    class Meta:
        model = Device
        fields = ['id', 'device_type_display', 'device_type', 'node', 'ip', 'name', 'display_name', 'children']

    def get_device_type_display(self, obj):
        return obj.get_device_type_display()

    def get_display_name(self, obj):
        return obj.__str__()

    def get_children(self, obj):
        children = obj.get_children()

        return SmartStripPlugSerializer(children, many=True).data


class NodeSerializer(serializers.ModelSerializer):
    devices = DeviceSerializer(many=True, required=False, allow_null=True)

    class Meta:
        model = Node
        fields = ['id', 'name', 'devices']
        extra_kwargs = {'devices': {'required': False}}
        validators = []
