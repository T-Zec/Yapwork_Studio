from rest_framework import serializers
from .models import Channel


class ChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Channel
        fields = (
            "id",
            "name",
            "workspace",
            "created_by",
            "channel_type",
            "created_at",
        )
        read_only_fields = ("created_by", "created_at", "workspace")