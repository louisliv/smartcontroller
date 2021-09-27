
from pywebostv.connection import WebOSClient
from pywebostv.controls import *


class LGDevice():
    def __init__(self, ip, client_key):
        self.client = WebOSClient(ip)
        self.client_key = client_key.key
        self.client.connect()
        for status in self.client.register({'client_key': self.client_key}):
            if status == WebOSClient.PROMPTED:
                print("Please accept the connect on the TV!")
            elif status == WebOSClient.REGISTERED:
                print("Registration successful!")

    def execute_command(self, command, type, arguement=None):
        if type == "system":
            return self._execute_system_command(command, arguement)
        if type == "input":
            return self._execute_input_command(command, arguement)
        if type == "tv":
            return self._execute_tv_command(command, arguement)
        if type == "source":
            return self._execute_source_command(command, arguement)
        if type == "media":
            return self._execute_media_command(command, arguement)
        if type == "app":
            return self._execute_app_command(command, arguement)

    def _execute_system_command(self, command, arguement):
        control = SystemControl(self.client)
        return self._execute_command(control, command, arguement)

    def _execute_input_command(self, command, arguement):
        control = InputControl(self.client)
        control.connect_input()
        return_value = self._execute_command(control, command, arguement)
        control.disconnect_input()
        return return_value

    def _execute_tv_command(self, command, arguement):
        control = TvControl(self.client)
        return self._execute_command(control, command, arguement)

    def _execute_source_command(self, command, arguement):
        control = SourceControl(self.client)
        return self._execute_command(control, command, arguement)

    def _execute_media_command(self, command, arguement):
        control = MediaControl(self.client)
        return self._execute_command(control, command, arguement)
    
    def _execute_app_command(self, command, arguement):
        control = ApplicationControl(self.client)
        return self._execute_command(control, command, arguement)

    def _execute_command(self, control, command, arguement):
        method_to_call = getattr(control, command)

        if arguement:
            return method_to_call(arguement)
        else:
            return method_to_call()
