
from PyQt5.QtWidgets import (QApplication, QWidget,
    QSystemTrayIcon, QMenu, QAction)
from PyQt5.QtGui import QIcon
from client import client
from threading import Thread

if __name__ == "__main__":
    
    app = QApplication([])
    app.setQuitOnLastWindowClosed(False)
    
    # Adding an icon
    icon = QIcon("icon.png")
    
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
    
    kwargs = {'host': '0.0.0.0', 'port': 3000, 'threaded': True, 'use_reloader': False, 'debug': False}
    flaskThread = Thread(target=client.run, daemon=True, kwargs=kwargs).start()
    
    app.exec_()