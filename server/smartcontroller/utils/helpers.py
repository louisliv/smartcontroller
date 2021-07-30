import nmap
import re
import socket

def reform_cmd_string(output):
    ansi_escape = re.compile(r'\x1B(?:[@-Z\\-_]|\[[0-?]*[ -/]*[@-~])')
    response = output.decode('utf8', "ignore").split('response:\n')[1]

    response = ansi_escape.sub('', response)
    response = response.replace('\n', '')
    response = response.replace('{  ', '').replace('}', '')
    response = response.replace(', ', ',')
    response = response.replace('\'', '')
    response_dict = {i.split(': ')[0]: i.split(': ')[1] for i in response.split(', ')}

    return response_dict

def rgb_to_hsv(r, g, b): 
  
    # R, G, B values are divided by 255 
    # to change the range from 0..255 to 0..1: 
    r, g, b = r / 255.0, g / 255.0, b / 255.0
  
    # h, s, v = hue, saturation, value 
    cmax = max(r, g, b)    # maximum of r, g, b 
    cmin = min(r, g, b)    # minimum of r, g, b 
    diff = cmax-cmin       # diff of cmax and cmin. 
  
    # if cmax and cmax are equal then h = 0 
    if cmax == cmin:  
        h = 0
      
    # if cmax equal r then compute h 
    elif cmax == r:  
        h = (60 * ((g - b) / diff) + 360) % 360
  
    # if cmax equal g then compute h 
    elif cmax == g: 
        h = (60 * ((b - r) / diff) + 120) % 360
  
    # if cmax equal b then compute h 
    elif cmax == b: 
        h = (60 * ((r - g) / diff) + 240) % 360
  
    # if cmax equal zero 
    if cmax == 0: 
        s = 0
    else: 
        s = (diff / cmax) * 100
  
    # compute v 
    v = cmax * 100
    return int(h), int(s), int(v)

def hex_to_rgb(hex):
    hex = hex.lstrip('#')
    hlen = len(hex)
    return tuple(int(hex[i:i + hlen // 3], 16) for i in range(0, hlen, hlen // 3))

def get_ip_address():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    s.connect(("8.8.8.8", 80))
    return s.getsockname()[0]

def discover_devices():
    from smartcontroller.models import Device

    nm = nmap.PortScanner()
    all_devices = Device.objects.all()

    ip = get_ip_address()

    ip_nums = ip.split('.')
    ip_nums[-1] = '0'

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

    return device_objs