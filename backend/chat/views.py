from rest_framework import viewsets, permissions
from rest_framework.exceptions import PermissionDenied
from django.shortcuts import get_object_or_404

from workspaces.models import WorkspaceMember
from channels.models import Channel
from .models import Message
from .serializers import MessageSerializer


class MessageViewSet(viewsets.ModelViewSet):
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_channel(self):
        workspace_id = self.kwargs.get("workspace_id")
        channel_id = self.kwargs.get("channel_id")

        channel = get_object_or_404(
            Channel,
            id=channel_id,
            workspace_id=workspace_id
        )

        # Validate workspace membership
        is_member = WorkspaceMember.objects.filter(
            workspace_id=workspace_id,
            user=self.request.user
        ).exists()

        if not is_member:
            raise PermissionDenied("You are not a member of this workspace.")

        return channel

    def get_queryset(self):
        channel = self.get_channel()
        return Message.objects.filter(channel=channel).order_by("-created_at")

    def perform_create(self, serializer):
        channel = self.get_channel()
        serializer.save(
            channel=channel,
            sender=self.request.user
        )

    def perform_update(self, serializer):
        if serializer.instance.sender != self.request.user:
            raise PermissionDenied("You can only edit your own messages.")
        serializer.save()

    def perform_destroy(self, instance):
        if instance.sender != self.request.user:
            raise PermissionDenied("You can only delete your own messages.")
        instance.delete()