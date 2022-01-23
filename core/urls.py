from django.contrib import admin
from django.urls import path, include, re_path
from django.views import generic
from myaccount.api.urls import api_patterns
from myaccount.views import BaseTemplateView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("myaccount/administrator/", admin.site.urls),
    path("", include("myaccount.urls")),
    path("api-auth/", include("rest_framework.urls")),
    path("api/", include(api_patterns)),
    re_path(".*", BaseTemplateView.as_view(), name="peter-mwangi"),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
