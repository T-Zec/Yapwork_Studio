from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action

from .models import Workspace, WorkspaceMember
from .serializers import WorkspaceSerializer, WorkspaceMemberSerializer


class WorkspaceViewSet(viewsets.ModelViewSet):
    serializer_class = WorkspaceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Workspace.objects.filter(members__user=self.request.user)

    def perform_create(self, serializer):
        workspace = serializer.save(created_by=self.request.user)

        # Automatically add creator as OWNER
        WorkspaceMember.objects.create(
            user=self.request.user,
            workspace=workspace,
            role="OWNER"
        )

    @action(detail=True, methods=["post"])
    def add_member(self, request, pk=None):
        workspace = self.get_object()
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
        user_id = request.data.get("user_id")

        WorkspaceMember.objects.filter(
            workspace=workspace,
            user_id=user_id
        ).delete()

        return Response({"message": "Member removed."})