from django.db.models.query import QuerySet
import six

from django.contrib.auth import authenticate, login, get_user_model
from django.contrib.auth.tokens import (
    default_token_generator,
    PasswordResetTokenGenerator,
)
from django.contrib.sites.shortcuts import get_current_site
from django.conf import settings
from django.http import Http404
from django.utils.encoding import force_bytes
from django.utils.http import (
    urlsafe_base64_encode as encode,
    urlsafe_base64_decode as decode,
)


from rest_framework import views
from rest_framework import status
from rest_framework import permissions
from rest_framework.authtoken.models import Token
from rest_framework.parsers import MultiPartParser, FormParser, FileUploadParser
from rest_framework.response import Response

from ..models import MyAccount, Message, MyProfile, ProfileImage, ProjectSample
from .serializers import (
    MyAccountSerializer,
    MessagesSerializer,
    ProfileSerializer,
    ProfileImageSerializer,
    ProjectSampleSerializer,
    ProfileImageCreateSerializer
)
from core.methods import send_mass_mail

#  ACCOUNT CREATE APIS
class AdminProfileImageAPIView(views.APIView):
    """
    APIView that creates Profile Images through post. User mut be authenticated
    """
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]

    def post(self, request, format=None):
        if request.user.email in settings.ALLOWED_MAILS:
            serializer = ProfileImageCreateSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({"info": "Unauthorized user"}, status=status.HTTP_400_BAD_REQUEST)


# GENERAL APIS
class TokenGenerator(PasswordResetTokenGenerator):
    """
    overriding  _make_hash_value
    """

    def _make_hash_value(self, user, timestamp):
        return (
            six.text_type(user.pk)
            + six.text_type(timestamp)
            + six.text_type(user.is_active)
        )


class LoginAPIView(views.APIView):
    """
    Provides a way of authenticating emails that are only defined in settings.
    Otherwise forbids
    """

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        data = request.data
        email = data.get("email", None)
        password = data.get("password", None)
        if email in settings.ALLOWED_MAILS:
            user = authenticate(email=email, password=password)
            if user is not None:
                if user.active:
                    login(request, user)
                    token, created = Token.objects.get_or_create(user=user)
                    return Response(
                        {
                            "info": f"Successfuly logged in with {email}",
                            "authenticated": True,
                            "token": token.key,
                            "email": email,
                        },
                        status=status.HTTP_200_OK,
                    )
            else:
                new_acc, created = MyAccount.objects.get_or_create(email=email)
                if created:
                    new_acc.set_password("kalamu@me")
                    new_acc.active = True
                    new_acc.save()
                    login(request, new_acc)
                    return Response(
                        {"info": f"Created and logged in with {email}"},
                        status=status.HTTP_201_CREATED,
                    )
                else:
                    return Response(
                        {
                            "info": f"Reset password for {email} account",
                            "reset_pwd": True,
                        },
                        status=status.HTTP_202_ACCEPTED,
                    )
        else:
            return Response(
                {"info": f"Forbidden Request"}, status=status.HTTP_401_UNAUTHORIZED
            )


class MyAccountAPIView(views.APIView):
    """
    API that returns profile data and handles email checks for authentication
    """

    queryset = MyAccount.objects.all()
    permission_classes = [permissions.AllowAny]

    def get(self, request, format=None):
        context = {"request": request}
        account = MyAccount.objects.all()
        projects = ProjectSample.objects.all()
        serializer_account = MyAccountSerializer(account, many=True, context=context)
        serializer_projects = ProjectSampleSerializer(
            projects, many=True, context=context
        )
        data = {
            "profiles": serializer_account.data,
            "projects": serializer_projects.data,
        }

        return Response(data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        email = request.data
        context = {}
        if email in settings.ALLOWED_MAILS:
            context["email"] = email
            return Response(context, status=status.HTTP_200_OK)
        context["info"] = "Results not found"
        context["noData"] = True
        return Response(context, status=status.HTTP_200_OK)


class MessagesAPIView(views.APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, format=None):
        serializer = MessagesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AllMessagesAPIView(views.APIView):
    """
    APIView for all messages sent by website viewers
    """

    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]
    queryset = Message.objects.all()

    def get_object(self, pk):
        try:
            return Message.objects.get(pk=pk)
        except Message.DoesNotExist:
            raise Http404

    def get(self, request, format=None):
        messages = Message.objects.all().order_by("-id")
        context = {"request": request}
        serializer = MessagesSerializer(messages, many=True, context=context)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, pk, format=None):
        message = self.get_object(pk)
        serializer = MessagesSerializer(message, many=False)
        message.delete()
        return Response(serializer.data, status=status.HTTP_200_OK)


class AdminAccountAPIView(views.APIView):
    """
    this method sends chuck of data to the user account.
    """

    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]

    def get_object(self, pk, db):
        try:
            return db.objects.get(pk=pk)
        except db.DoesNotExist:
            raise Http404

    def get(self, request, formart=None):
        messages = Message.objects.all().order_by("-id")
        profile_images = ProfileImage.objects.all().order_by("-id")
        profiles = MyProfile.objects.all().order_by("-id")
        context = {"request": request}
        serializer_msg = MessagesSerializer(messages, many=True, context=context)
        serializer_prof_img = ProfileImageSerializer(
            profile_images, many=True, context=context
        )
        serializer_profs = ProfileSerializer(profiles, many=True, context=context)
        data = [
            serializer_msg.data,
            serializer_prof_img.data,
            serializer_profs.data,
        ]
        return Response(data, status=status.HTTP_200_OK)

    def delete(self, request, pk, formart=None):
        """
        delete method only deletes ProfileImage instances since request.DELETE cant receive
        extra data. request.data is always empty.
        """
        print(pk)
        obj = self.get_object(pk, ProfileImage)
        serializer = ProfileImageSerializer(
            obj, many=False, context={"request": request}
        )
        obj.delete()
        return Response(serializer.data, status=status.HTTP_200_OK)


# Password Reset


class ResetPasswordAPIView(views.APIView):
    """
    APIView that receives post request for password reset.
    It also sends email to the default email address in settings
    otherwise forbids
    """

    permission_classes = [permissions.AllowAny]
    template_name = "customs/reset_password.html"

    def post(self, request, format=None):
        email = request.data["email"]
        password = request.data["password"]
        if email in settings.ALLOWED_MAILS:
            try:
                user = MyAccount.objects.get(email=email, active=True)
                if user:
                    account = {
                        "email": email,
                        "domain": get_current_site(request).domain,
                        "uid": encode(force_bytes(user.pk)),
                        "token": default_token_generator.make_token(user),
                    }
                    message = {
                        "subject": "Innovest admin messages",
                        "recipients": settings.ALLOWED_MAILS,
                        "template": self.template_name,
                        "context": {
                            "account": account,
                        },
                    }
                    send_mass_mail([message])
                    user.set_password(password)
                    user.save()
                    return Response(
                        {"info": "Password reseted successfully"},
                        status=status.HTTP_200_OK,
                    )
            except MyAccount.DoesNotExist:
                return Response(
                    {
                        "info": "Email not found. Or you are trying to reset password for unactive account"
                    },
                    status=status.HTTP_200_OK,
                )
        return Response(
            {"info": "You are forbidden to perform this action"},
            status=status.HTTP_200_OK,
        )


class ResetPasswordConfirmAPIView(views.APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, format=None):
        UserModel = get_user_model()
        data = request.data

        #    def post(self, request, uidb64=None, token=None, *arg, **kwargs):
        #     """
        #     View that checks the hash in a password reset link and presents a
        #     form for entering a new password.
        #     """
        #     UserModel = get_user_model()
        #     form = self.form_class(request.POST)
        #     assert uidb64 is not None and token is not None  # checked by URLconf
        #     try:
        #         uid = decode(uidb64)
        #         user = UserModel._default_manager.get(pk=uid)
        #     except (TypeError, ValueError, OverflowError, UserModel.DoesNotExist):
        #         user = None

        #     if user is not None and default_token_generator.check_token(user, token):
        #         if form.is_valid():
        #             new_password = form.cleaned_data['new_password2']
        #             user.set_password(new_password)
        #             user.save()
        #             messages.success(request, 'Password has been reset with success.')
        #             return self.form_valid(form)
        #         else:
        #             messages.error(request, 'Password reset is unsuccessful.')
        #             return self.form_invalid(form)
        #     else:

        #         messages.error(
        #             request, 'Password reset  link is no longer valid.')
        #         # return self.form_invalid(form)
        #         return redirect('/')
