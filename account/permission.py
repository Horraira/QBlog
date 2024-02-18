from rest_framework import permissions
from rest_framework.permissions import SAFE_METHODS

class Authenticated(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated)
    
class NoPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        return True
    
class IsSuperUser(permissions.BasePermission):
    """
    Superuser permission
    """
    message = 'You are not authorised to view this page.'

    def has_permission(self, request, view):
        return bool(
            request.user and request.user.is_authenticated and request.user.is_superuser)


class IsAdmin(permissions.BasePermission):
    """
    Admin permission
    """
    message = 'You are not authorised to view this page.'

    def has_permission(self, request, view):
        return bool(
            request.user and request.user.is_authenticated and request.user.user_type == 'admin')
    
class IsAuthor(permissions.BasePermission):
    """
    Object-level permission to only allow owners of an object to edit it.
    """
    message = 'You are not authorised to view this page.'

    def has_object_permission(self, request, view, obj):
        return bool(
            request.user and request.user.is_authenticated and request.user.user_type == 'author')
    
class IsNormalUser(permissions.BasePermission):
    """
    Normal user permission
    """
    message = 'You are not authorised to view this page.'

    def has_permission(self, request, view):
        return bool(
            request.user and request.user.is_authenticated and request.user.user_type == 'normal')
    
class BlogOwner(permissions.BasePermission):
    """
    Object-level permission to only allow owners of an object to edit it.
    """
    message = 'You are not authorised to perform this action.'

    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.user_type == 'author')
    def has_object_permission(self, request, view, obj):
        # only the blog author can update or delete the blog
        return bool(request.user.id == obj.author.id)


