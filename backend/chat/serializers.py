from rest_framework import serializers
from .models import Message
from users.serializers import UserSerializer


class MessageSerializer(serializers.ModelSerializer):
    sender = UserSerializer(read_only=True)
    attachment = serializers.FileField(required=False, allow_null=True, use_url=True)
    
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

        def validate(self, attrs):
            content = (attrs.get("content") or "").strip()
            attachment = attrs.get("attachment")

            if not content and not attachment:
                raise serializers.ValidationError("Message must contain text or attachment.")
            
            if attachment and hasattr(attachment, 'size'):
                if attachment.size > 5 * 1024 * 1024: # 5MB Limit
                    raise serializers.ValidationError("File size must be under 5MB.")
                
            attrs["content"] = content
            return attrs