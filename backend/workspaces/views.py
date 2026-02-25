from rest_framework import viewsets, permissions, status
from rest_framework.exceptions import PermissionDenied

from rest_framework.response import Response
from rest_framework.decorators import action

from .models import Workspace, WorkspaceMember
from .serializers import WorkspaceSerializer
from .permissions import IsWorkspaceOwner, IsWorkspaceMember


class WorkspaceViewSet(viewsets.ModelViewSet):
    serializer_class = WorkspaceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Workspace.objects.filter(members__user=self.request.user).distinct()
    
    def get_permissions(self):
        if self.action in ["update", "partial_update", "destroy"]:
            return [permissions.IsAuthenticated(), IsWorkspaceOwner()]
        return [permissions.IsAuthenticated()]
    
    def check_object_permissions(self, request, obj):
        if not WorkspaceMember.objects.filter(
            workspace=obj,
            user=request.user
        ).exists():
            raise PermissionDenied("You are not a member of this workspace.")
        
        super().check_object_permissions(request, obj)

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
        
        if not user_id:
            return Response({"error": "User ID required."}, status=400)

        WorkspaceMember.objects.filter(
            workspace=workspace,
            user_id=user_id
        ).delete()

        return Response({"message": "Member removed."})