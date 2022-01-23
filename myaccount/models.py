import pathlib
import uuid
from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser


def file_path(instance, filename):
    img_path = pathlib.Path(filename)
    name = str(uuid.uuid1())
    folder = (instance.__class__.__name__).lower()
    return f"{folder}/{name}{img_path.suffix}"


class ProjectSample(models.Model):
    project_name = models.CharField(max_length=255)
    cartegory = models.CharField(max_length=255)
    client = models.CharField(max_length=255)
    url = models.CharField(max_length=255)
    brief = models.TextField()
    project_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.project_name}"


class Message(models.Model):
    email = models.EmailField(verbose_name="message email", max_length=255)
    name = models.CharField(max_length=255)
    message = models.TextField()
    sent_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email


class MyProfile(models.Model):
    email = models.EmailField(
        default="pmwassini@gmail.com",
        verbose_name="email address",
        max_length=255,
        unique=True,
    )
    phone = models.CharField(max_length=13, default="+254796487662")
    address = models.CharField(max_length=50, default="Nakuru, Kenya")
    resume = models.FileField(upload_to="media/profile/resumes", null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.email

    @property
    def get_avatar(self):
        return (
            self.avatar.url
        )  # if self.avatar else static('assets/img/team/default-profile-picture.png')


class UserManager(BaseUserManager):
    def create_user(self, email, password=None):
        if not email:
            raise ValueError("Email address must be set")
        user = self.model(
            email=self.normalize_email(email),
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_staffuser(self, email, password):
        user = self.create_user(
            email,
            password=password,
        )
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        user = self.create_user(
            email,
            password=password,
        )
        user.active = True
        user.save(using=self._db)
        return user


class MyAccount(AbstractBaseUser):
    """
    Modified User account to suit special authorization and uthentication
    """
    email = models.EmailField(
        default="pmwassini@gmail.com",
        verbose_name="email address",
        max_length=255,
        unique=True,
    )
    first_name = models.CharField(
        default="Peter Mwangi",
        verbose_name="first name",
        max_length=255,
    )
    last_name = models.CharField(
        default="Maina",
        verbose_name="last name",
        max_length=255,
    )
    token = models.CharField(
        verbose_name="custom auth token", max_length=50, blank=True, null=True
    )
    active = models.BooleanField(default=False)
    staff = models.BooleanField(default=True)
    admin = models.BooleanField(default=True)
    objects = UserManager()
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"

    def get_short_name(self):
        return self.email

    def __str__(self):
        return f"{self.email}"

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def get_all_profiles(self):
        email = self.email
        qs = MyProfile.objects.filter(email=email)
        return qs

    @property
    def is_active(self):
        return self.active

    @property
    def is_staff(self):
        return self.staff

    @property
    def is_admin(self):
        return self.admin


class ProfileImage(models.Model):
    profile_img = models.ImageField(
        upload_to=file_path, height_field=None, width_field=None, max_length=None
    )
    uploaded_at = models.DateTimeField(auto_now_add=True)
