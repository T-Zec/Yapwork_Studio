from rest_framework import serializers
from .models import Message


class MessageSerializer(serializers.ModelSerializer):
    def validate(self, attrs):
        content = attrs.get("content")
        attachment = attrs.get("attachment")

        if not content and not attachment:
            raise serializers.ValidationError("Message must contain text or attachment.")
        
        if attachment:
            if attachment.size > 5 * 1024 * 1024: # 5MB Limit
                raise serializers.ValidationError("File size must be under 5MB.")
            
        return attrs
    
    class Meta:
        model = Message
        fields = (
            "id",
            "channel",
            "sender",
            "content",
            "attachment",
            "created_at",
            "updated_at",
        )
        read_only_fields = (
            "sender",
            "channel",
            "created_at",
            "updated_at",
        )