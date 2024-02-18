from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils import timezone
from django.contrib.auth.base_user import BaseUserManager

USER_TYPE_CHOICES = [
        ('normal', 'Normal User'),
        ('author', 'Author'),
        ('admin', 'Admin'),
    ]

class CustomUserManager(BaseUserManager):
    def create_user(self, username, password, user_type, **extra_fields):
        if not username:
            raise ValueError(_("The username must be set"))
        if not user_type:
            raise ValueError(_("The user_type must be set"))
        user = self.model(username=username, 
                          user_type=user_type,
                          **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, username, password, **extra_fields):
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)
        extra_fields.setdefault("is_staff", True)
        if extra_fields.get("is_superuser") is not True:
            raise ValueError(_("Superuser must have is_superuser=True."))
        return self.create_user(username, password, **extra_fields)
    
class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=150, unique=True)
    user_type = models.CharField(max_length=20, choices=USER_TYPE_CHOICES, default='normal')
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ['user_type']
    objects = CustomUserManager()

    def __str__(self):
        return f'{self.username}'