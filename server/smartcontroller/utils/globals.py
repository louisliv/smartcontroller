from smartcontroller.models import Device
DEVICE_IDENTIFIERS = [
    {
        "device_type": Device.ROKU,
        "xml": 'dd.xml',
        "header": 'LOCATION',
        "get_xml": True,
        "xml_indentifier": "friendlyName"
    },
    {
        "device_type": Device.LGTV,
        "header": 'DLNADeviceName.lge.com',
        "get_xml": False
    }
]

KASA_ENUM = {
    'Plug': Device.PLUG,
    'Bulb': Device.BULB
}