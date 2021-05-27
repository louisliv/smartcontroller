
from PyQt5.QtWidgets import (QApplication, QWidget,
    QSystemTrayIcon, QMenu, QAction)
from PyQt5.QtGui import QIcon
from client import client
from threading import Thread
import platform

ICON_FILE = 'keyboard-24' if platform.system() == 'Linux' else 'keyboard-16'

if __name__ == "__main__":
    
    app = QApplication([])
    app.setQuitOnLastWindowClosed(False)
    
    # Adding an icon
    icon = QIcon(ICON_FILE)
    
    # Adding item on the menu bar
    tray = QSystemTrayIcon()
    tray.setIcon(icon)
    tray.setVisible(True)
    
    # Creating the options
    menu = QMenu()
    
    # To quit the app
    quit = QAction("Quit")
    quit.triggered.connect(app.quit)
    menu.addAction(quit)
    
    # Adding options to the System Tray
    tray.setContextMenu(menu)

    tray.setToolTip('Smartcontroller Client')
    
    kwargs = {'host': '0.0.0.0', 'port': 3000, 'threaded': True, 'use_reloader': False, 'debug': False}
    flaskThread = Thread(target=client.run, daemon=True, kwargs=kwargs).start()
    
    app.exec_()