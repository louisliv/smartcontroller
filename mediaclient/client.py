from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from buttons import BUTTONS, BUTTON_LINUX
import keyboard
import os
import platform
import logging

BTNS = BUTTON_LINUX if platform.system() == 'Linux' else BUTTONS

config = {
  'ORIGINS': [
    'http://localhost:4200',  # React
    'http://127.0.0.1:4200',  # React
  ],
}

client = Flask(__name__)

CORS(client, resources={ r'/*': {'origins': config['ORIGINS']}}, supports_credentials=True)

logging.basicConfig(filename='smartcontroller.log', level=logging.DEBUG)

@client.route("/keyboard", methods = ['POST'])
@cross_origin(origin='http://localhost:4200')
def computer_keyboard():
    data = request.json.get('literal')
    media_btn = BTNS.get(data, None)
    
    if media_btn:
        keyboard.send(media_btn)
    else:
        keyboard.send(data)
        
    return jsonify("Btn Accepted")
