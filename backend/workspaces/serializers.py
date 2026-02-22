from rest_framework import serializers
from .models import Workspace, WorkspaceMember


class WorkspaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workspace
        fields = ("id", "name", "description", "created_by", "created_at")
        read_only_fields = ("created_by", "created_at")

class WorkspaceMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkspaceMember
        fields = ("id", "user", "workspace", "role", "joined_at")
        read_only_fields = ("joined_at")