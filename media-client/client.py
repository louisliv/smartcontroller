from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from buttons import BUTTONS, BUTTON_LINUX
import keyboard
import platform

BTNS = BUTTON_LINUX if platform.system() == 'Linux' else BUTTONS

app = Flask(__name__)

@app.route("/btn-click", methods = ['POST'])
@cross_origin(origin='http://localhost:4200')
def btn_click():
    data = request.json.get('button')
    keyboard.send(BTNS[data])
    return jsonify("Btn Accepted")

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=3000)