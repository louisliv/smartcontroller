from rest_framework import serializers
from .models import Node, Device


class DeviceSerializer(serializers.ModelSerializer):
    device_type_display = serializers.SerializerMethodField()
    name = serializers.SerializerMethodField()

    class Meta:
        model = Device
        fields = ['id', 'device_type_display', 'device_type', 'node', 'ip', 'name']

    def get_device_type_display(self, obj):
        return obj.get_device_type_display()

    def get_name(self, obj):
        return obj.__str__()


class NodeSerializer(serializers.ModelSerializer):
    devices = DeviceSerializer(many=True, required=False, allow_null=True)

    class Meta:
        model = Node
        fields = ['id', 'name', 'devices']
        extra_kwargs = {'devices': {'required': False}}
        validators = []
