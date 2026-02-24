from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from django.shortcuts import get_object_or_404

from workspaces.models import Workspace, WorkspaceMember
from .models import Channel
from .serializers import ChannelSerializer


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