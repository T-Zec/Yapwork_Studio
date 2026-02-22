from rest_framework import permissions
from .models import WorkspaceMember


class IsWorkspaceOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return WorkspaceMember.objects.filter(
            workspace=obj,
            user=request.user,
            role="OWNER"
        ).exists()