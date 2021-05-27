from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from buttons import BUTTONS, BUTTON_LINUX
import keyboard
import os
import platform

BTNS = BUTTON_LINUX if platform.system() == 'Linux' else BUTTONS

client = Flask(__name__)

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
