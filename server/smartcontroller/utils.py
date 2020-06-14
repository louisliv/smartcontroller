import re

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