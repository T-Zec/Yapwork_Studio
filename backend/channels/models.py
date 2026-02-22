from django.db import models
from django.conf import settings
from workspaces.models import Workspace


class Channel(models.Model):
    CHANNEL_TYPES = (
        ("TEXT", "Text"),
    )

    name = models.CharField(max_length=255)
    workspace = models.ForeignKey(
        Workspace,
        on_delete=models.CASCADE,
        related_name="channels"
    )
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )
    channel_type = models.CharField(
        max_length=10,
        choices=CHANNEL_TYPES,
        default="TEXT"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.workspace.name})"