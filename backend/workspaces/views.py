from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.exceptions import PermissionDenied

from .models import Workspace, WorkspaceMember
from .serializers import WorkspaceSerializer, WorkspaceMemberSerializer
from .permissions import IsWorkspaceOwner


class WorkspaceViewSet(viewsets.ModelViewSet):
    serializer_class = WorkspaceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Workspace.objects.filter(members__user=self.request.user)

    def perform_create(self, serializer):
        workspace = serializer.save(created_by=self.request.user)

        WorkspaceMember.objects.create(
            user=self.request.user,
            workspace=workspace,
            role="OWNER"
        )

    def perform_update(self, serializer):
        workspace = self.get_object()

        is_owner = WorkspaceMember.objects.filter(
            workspace=workspace,
            user=self.request.user,
            role="OWNER"
        ).exists()

        if not is_owner:
            raise PermissionDenied("Only owner can edit workspace.")

        serializer.save()

    def destroy(self, request, *args, **kwargs):
        workspace = self.get_object()

        if not IsWorkspaceOwner().has_object_permission(request, self, workspace):
            return Response({"error": "Only owner can delete workspace."}, status=403)

        return super().destroy(request, *args, **kwargs)

    @action(detail=True, methods=["post"])
    def add_member(self, request, pk=None):
        workspace = self.get_object()

        if not IsWorkspaceOwner().has_object_permission(request, self, workspace):
            return Response({"error": "Only owner can add members."}, status=403)

        user_id = request.data.get("user_id")

        if not user_id:
            return Response({"error": "User ID required."}, status=400)

        WorkspaceMember.objects.create(
            user_id=user_id,
            workspace=workspace,
            role="MEMBER"
        )

        return Response({"message": "Member added."})

    @action(detail=True, methods=["post"])
    def remove_member(self, request, pk=None):
        workspace = self.get_object()

        if not IsWorkspaceOwner().has_object_permission(request, self, workspace):
            return Response({"error": "Only owner can remove members."}, status=403)

        user_id = request.data.get("user_id")

        WorkspaceMember.objects.filter(
            workspace=workspace,
            user_id=user_id
        ).delete()

        return Response({"message": "Member removed."})