from django.contrib import admin
from django.urls import path, include, re_path
from . import views

api_patterns = [
    path("accounts/", views.MyAccountAPIView.as_view()),
    path("accounts/login/", views.LoginAPIView.as_view()),
    path("accounts/reset-password/", views.ResetPasswordAPIView.as_view()),
    path(
        "accounts/activate/<uidb64>/<token>/",
        views.ResetPasswordConfirmAPIView.as_view(),
        name="reset-password-confirm",
    ),
    path("accounts/messages/", views.MessagesAPIView.as_view()),
    path("accounts/all-messages/", views.AllMessagesAPIView.as_view()),
    path("accounts/delete-messages/<int:pk>/", views.AllMessagesAPIView.as_view()),
    path("myaccount/", views.AdminAccountAPIView.as_view()),
    path(
        "myaccount/delete/profile-image/<int:pk>/", views.AdminAccountAPIView.as_view()
    ),
    path("myaccount/profile-image/", views.AdminProfileImageAPIView.as_view()),
]
