from PyQt5.QtWidgets import QSystemTrayIcon, QMenu, QAction


class SystemTrayIcon(QSystemTrayIcon):
    def __init__(self, icon, app, parent=None,*args, **kwargs):
        QSystemTrayIcon.__init__(self, icon, parent)
        self.setVisible(True)
        
        # Creating the options
        menu = QMenu(parent)
        option1 = QAction("Geeks for Geeks")
        option2 = QAction("GFG")
        menu.addAction(option1)
        menu.addAction(option2)

        # To quit the app
        quit = QAction("Quit")
        quit.triggered.connect(app.quit)
        menu.addAction(quit)
        
        # Adding options to the System Tray
        self.setContextMenu(menu)