from rest_framework import permissions
from workspaces.models import WorkspaceMember


class IsChannelWorkspaceMember(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return WorkspaceMember.objects.filter(
            workspace=obj.workspace,
            user=request.user
        ).exists()
    

class IsChannelWorkspaceOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return WorkspaceMember.objects.filter(
            workspace=obj.workspace,
            user=request.user,
            role="OWNER"
        ).exists()