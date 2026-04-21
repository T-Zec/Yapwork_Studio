from django.db import models
from django.conf import settings
from channels.models import Channel
from cloudinary_storage.storage import RawMediaCloudinaryStorage
from django.core.validators import FileExtensionValidator


class Message(models.Model):

    def upload_to(instance, filename):
        return f"message_attachments/{instance.channel.id}/{filename}"

    channel = models.ForeignKey(
        Channel,
        on_delete=models.CASCADE,
        related_name="messages"
    )
    sender = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="sent_messages"
    )
    content = models.TextField(blank=True)    
    attachment = models.FileField(
        upload_to=upload_to,
        storage=RawMediaCloudinaryStorage(),
        validators=[
            FileExtensionValidator(
                allowed_extensions=["jpg", "jpeg", "png", "webp", "pdf", "docx", "xlsx", "txt"]
            ),
        ],
        null=True,
        blank=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    

    def __str__(self):
        return f"{self.sender} in {self.channel}"
    
    class Meta:
        ordering = ["-created_at"]