#!/usr/bin/env python3
"""Send out a M-SEARCH request and listening for responses."""
import asyncio
from threading import Thread
import socket
from urllib.request import urlopen
from urllib.parse import unquote
from xml.etree.ElementTree import parse

import ssdp

from smartcontroller.utils.globals import DEVICE_IDENTIFIERS, KASA_ENUM
from kasa import Discover
import xmltodict

class ThreadWithReturnValue(Thread):
    def __init__(
        self,
        group=None,
        target=None,
        name=None,
        args=(),
        kwargs={},
        Verbose=None
    ):
        Thread.__init__(self, group, target, name, args, kwargs)
        self._return = None
    def run(self):
        if self._target is not None:
            self._return = self._target(
                *self._args,
                **self._kwargs
            )
    def join(self, *args):
        Thread.join(self, *args)
        return self._return


class DiscoveredDevice():
    def __init__(self, device_name, device_type, ip) -> None:
        self.obj = {
            "type": device_type,
            "name": device_name,
            "ip": ip
        }

    def __call__(self) -> dict:
        return self.obj

class DiscoverProtocol(ssdp.SimpleServiceDiscoveryProtocol):
    """Protocol to handle responses and requests."""
    def __init__(self):
        super().__init__()
        self.discovered_devices = []

    def response_received(self, response: ssdp.SSDPResponse, addr: tuple):
        """Handle an incoming response."""

        for device_ident in DEVICE_IDENTIFIERS:
            filtered_headers = list(filter(
                lambda header: header[0] == device_ident['header'],
                response.headers
            ))

            if filtered_headers:
                indent_header = filtered_headers[0]
                device_name = None

                if device_ident['get_xml'] and device_ident['xml'] in indent_header[1]:
                    device_name = self.get_name_from_xml(indent_header[1], device_ident['xml_indentifier'])
                elif indent_header[0].lower() != 'location':
                    device_name = unquote(indent_header[1])

                if indent_header[0].lower != "location":
                    location_header = list(filter(
                        lambda header: header[0].lower() == 'location',
                        response.headers
                    ))[0][1]
                else:
                    location_header = indent_header[1]

                device_ip = location_header.split(':')[1].strip("//")

                if device_name:
                    found = list(filter(
                        lambda device: device['ip'] == device_ip,
                        self.discovered_devices
                    ))

                    if not found:
                        new_device = DiscoveredDevice(
                            device_name,
                            device_ident['device_type'],
                            device_ip
                        )
                        self.discovered_devices.append(new_device())

    def request_received(self, request: ssdp.SSDPRequest, addr: tuple):
        """Handle an incoming request."""
        print(
            "received request: {} {} {}".format(
                request.method, request.uri, request.version
            )
        )

        for header in request.headers:
            print("header: {}".format(header))

        print()

    def get_name_from_xml(self, location, indentifier):

        file = urlopen(location)
        data = file.read()
        file.close()

        data = xmltodict.parse(data)
        return data['root']['device'][indentifier]


def discover():
    discovered_devices = []

    try:
        ssdp_thread = ThreadWithReturnValue(target=ssdp_discover)
        kasa_thread = ThreadWithReturnValue(target=kasa_discover)
    except:
        print("Error: unable to start thread")

    ssdp_thread.start()
    kasa_thread.start()

    ssdp_devices = None
    kasa_devices = None

    while not ssdp_devices and not kasa_devices:
        if not ssdp_devices:
            ssdp_devices = ssdp_thread.join()

        if not kasa_devices:
            kasa_devices = kasa_thread.join()

    discovered_devices.extend(ssdp_devices)
    discovered_devices.extend(kasa_devices)

    return discovered_devices


def ssdp_discover():
    discovered_devices = []
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    connect = loop.create_datagram_endpoint(DiscoverProtocol, family=socket.AF_INET)
    transport, protocol = loop.run_until_complete(connect)

    # Send out an M-SEARCH request, requesting all service types.
    search_request = ssdp.SSDPRequest(
        "M-SEARCH",
        headers={
            "HOST": "239.255.255.250:1900",
            "MAN": '"ssdp:discover"',
            "MX": "4",
            "ST": "ssdp:all",
        },
    )
    search_request.sendto(transport, (DiscoverProtocol.MULTICAST_ADDRESS, 1900))

    # Keep on running for 5 seconds.
    try:
        loop.run_until_complete(asyncio.sleep(5))
    except KeyboardInterrupt:
        pass

    transport.close()
    loop.close()

    discovered_devices.extend(protocol.discovered_devices)

    return discovered_devices


def kasa_discover():
    discovered_devices = []

    found_devs = asyncio.run(Discover.discover(timeout=5))
    for ip, dev in found_devs.items():
        device_type = KASA_ENUM[dev.device_type.name]
        new_device = DiscoveredDevice(dev.alias, device_type, ip)
        discovered_devices.append(new_device())

    return discovered_devices
