from django.contrib import admin
from django.urls import path
from django.conf.urls import include, url
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import routers
from smartcontroller.views import (NodeViewSet, DeviceViewSet)

router = routers.DefaultRouter()
router.register(r'nodes', NodeViewSet, 'nodes')
router.register(r'devices', DeviceViewSet, 'devices')

urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^api/', include(router.urls))
]
