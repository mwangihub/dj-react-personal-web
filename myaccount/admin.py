from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import MyAccount, MyProfile,Message
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
    list_display = ( "email","avatar","phone","address","resume","current",)
    
class MessageAdmin(admin.ModelAdmin):
    list_display = ( "email","name",'sent_at')
    
admin.site.register(MyAccount, UserAdmin)
admin.site.register(MyProfile, ProfileAdmin)
admin.site.register(Message, MessageAdmin)