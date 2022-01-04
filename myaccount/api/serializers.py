from django.contrib.sites.shortcuts import get_current_site
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import authenticate
from django.conf import settings
from rest_framework import serializers
from ..models import MyAccount, MyProfile, Message


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyProfile
        fields = ["email", "avatar", "phone", "address", "resume", "current", ]


class MyAccountSerializer(serializers.ModelSerializer):
    profiles = serializers.SerializerMethodField(
        method_name='get_all_profiles')
    links = serializers.SerializerMethodField(method_name='get_link_url')

    class Meta:
        model = MyAccount
        fields = [
            "id", "email", "first_name", "last_name", "active", "profiles", "links"
        ]

    def get_all_profiles(self, obj):
        email = obj.email
        profile = MyProfile.objects.all()
        return ProfileSerializer(profile, many=True).data

    def get_link_url(self, obj):
        data = {
            'twitter': "https://twitter.com/__Mwassini__",
            'github': "https://github.com/mwangihub/mwangihub",
            'skype': f"skype:{obj.email}"
        }
        return data


class MessagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'
