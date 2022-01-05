from django.contrib import admin
from django.urls import path, include, re_path
from django.views import generic
from myaccount.api.urls import api_patterns
from myaccount.views import BaseTemplateView
from django.contrib.staticfiles.storage import staticfiles_storage

urlpatterns = [
    path('myaccount/administrator/', admin.site.urls),
    path('', include('myaccount.urls')),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(api_patterns)),
    re_path(r'^.*', BaseTemplateView.as_view()),
    path('favicon.ico', generic.base.RedirectView.as_view(url=staticfiles_storage.url('favicon.ico')))
]
