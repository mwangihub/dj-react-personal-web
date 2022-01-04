from allauth.account.adapter import DefaultAccountAdapter
from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from django.urls import reverse

class AccountAdapter(DefaultAccountAdapter):
    # after google LOGIN
    def get_login_redirect_url(self, request):
        url = reverse("profile")
        return url
    
    # after google SIGN UP
    def get_signup_redirect_url(self, request):
        url = reverse("check-mail")
        return url

class SocialAccountAdapter(DefaultSocialAccountAdapter):
    def get_connect_redirect_url(self, request, socialaccount):
        assert request.user.is_authenticated
        url = reverse("profile")
        return url

