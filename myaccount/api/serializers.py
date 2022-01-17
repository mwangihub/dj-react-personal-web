from django.contrib.sites.shortcuts import get_current_site
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import authenticate
from django.conf import settings
from django.db.models import fields
from rest_framework import serializers
from ..models import MyAccount, MyProfile, Message, ProfileImage, ProjectSample


class ProjectSampleSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectSample
        fields = "__all__"


class ProfileImageCreateSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ProfileImage
        fields = "__all__"




class ProfileImageSerializer(serializers.ModelSerializer):
    profile_img = serializers.SerializerMethodField()
    
    class Meta:
        model = ProfileImage
        fields = (
            "id",
            "profile_img",
            "uploaded_at",
        )

    def get_profile_img(self, obj):
        request = self.context["request"]
        return request.build_absolute_uri(obj.profile_img.url)


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyProfile
        fields = "__all__"


class MyAccountSerializer(serializers.ModelSerializer):
    profiles = serializers.SerializerMethodField(method_name="get_all_profiles")
    links = serializers.SerializerMethodField(method_name="get_link_url")
    images = serializers.SerializerMethodField(method_name="get_all_profile_images")

    class Meta:
        model = MyAccount
        fields = [
            "id",
            "email",
            "first_name",
            "last_name",
            "active",
            "profiles",
            "links",
            "images",
        ]

    def get_all_profiles(self, obj):
        email = obj.email
        profile = MyProfile.objects.all()
        serializer = ProfileSerializer(profile, many=True)
        return serializer.data

    def get_all_profile_images(self, obj):
        email = obj.email
        profile_img = ProfileImage.objects.all()
        serializer = ProfileImageSerializer(
            profile_img, many=True, context={"request": self.context["request"]}
        )
        return serializer.data

    def get_link_url(self, obj):
        data = {
            "twitter": "https://twitter.com/__Mwassini__",
            "github": "https://github.com/mwangihub/mwangihub",
            "skype": f"skype:{obj.email}",
        }
        return data


class MessagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = "__all__"
