from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import MyAccount, MyProfile,Message,ProfileImage,ProjectSample
from .api.forms import UserAdminChangeForm, UserAdminCreationForm

class UserAdmin(BaseUserAdmin):
    list_display = ("email","first_name","last_name","active",)
    list_filter = ("email", "active")
    ordering = ("email",)
    fieldsets = (
        ("Basic", {"fields": ("email", "password")}),
        ("Personal info", {"fields": ("first_name", "last_name")}),
        ("Authentication(custom)", {"fields": ("token", )},),
        ("Permissions", {"fields": ("admin", "active", "staff", )},),
    )
    add_fieldsets = (
        (None, {"classes": ("wide",), "fields": ("email", "password1", "password2", "first_name",
                                                 "last_name", "active", "staff", "admin"), }, ),
    )
    filter_horizontal = ()
    form = UserAdminChangeForm
    add_form = UserAdminCreationForm

class ProfileAdmin(admin.ModelAdmin):
    list_display = ( "email","phone","address","resume",)
    
class MessageAdmin(admin.ModelAdmin):
    list_display = ( "email","name",'sent_at')
    
    
class ProfileImagesAdmin(admin.ModelAdmin):
    list_display = ("id","profile_img",'uploaded_at')
    
class ProjectSampleAdmin(admin.ModelAdmin):
    list_display = (
        "project_name","cartegory","client","url","project_date",
    )
    
admin.site.register(MyAccount, UserAdmin)
admin.site.register(MyProfile, ProfileAdmin)
admin.site.register(Message, MessageAdmin)
admin.site.register(ProfileImage, ProfileImagesAdmin)
admin.site.register(ProjectSample, ProjectSampleAdmin)