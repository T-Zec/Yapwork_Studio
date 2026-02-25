from rest_framework import viewsets, permissions, status
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from workspaces.models import Workspace, WorkspaceMember
from .models import Channel
from .serializers import ChannelSerializer
from .permissions import IsChannelWorkspaceOwner, IsChannelWorkspaceMember


class ChannelViewSet(viewsets.ModelViewSet):
    serializer_class = ChannelSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_workspace(self):
        workspace_id = self.kwargs.get("workspace_id")
        workspace = get_object_or_404(Workspace, id=workspace_id)

        # Check membership
        is_member = WorkspaceMember.objects.filter(
            workspace=workspace,
            user=self.request.user
        ).exists()

        if not is_member:
            raise PermissionDenied("You are not a member of this workspace.")

        return workspace

    def get_queryset(self):
        workspace = self.get_workspace()
        return Channel.objects.filter(workspace=workspace)
    
    def get_permissions(self):
        if self.action in ["destroy"]:
            return [permissions.IsAuthenticated(), IsChannelWorkspaceOwner()]
        elif self.action in ["update", "partial_update"]:
            return [permissions.IsAuthenticated(), IsChannelWorkspaceMember()]
        return [permissions.IsAuthenticated()]
    
    def check_object_permissions(self, request, obj):
        if not WorkspaceMember.objects.filter(
            workspace=obj.workspace,
            user=request.user
        ).exists():
            raise PermissionDenied("You are not a member of this workspace.")
        
        super().check_object_permissions(request, obj)

    def perform_create(self, serializer):
        workspace = self.get_workspace()
        serializer.save(
            workspace=workspace,
            created_by=self.request.user
        )

    def perform_update(self, serializer):
        workspace_id = self.kwargs.get("workspace_id")

        is_member = WorkspaceMember.objects.filter(
            workspace_id=workspace_id,
            user=self.request.user
        ).exists()

        if not is_member:
            raise PermissionDenied("You are not a member of this workspace.")
        
        serializer.save()

    def destroy(self, request, *args, **kwargs):
        workspace_id = self.kwargs.get("workspace_id")

        is_owner = WorkspaceMember.objects.filter(
            workspace_id=workspace_id,
            user=request.user,
            role="OWNER"
        ).exists()

        if not is_owner:
            raise PermissionDenied("Only workspace owner can delete channels.")
        
        return super().destroy(request, *args, **kwargs)