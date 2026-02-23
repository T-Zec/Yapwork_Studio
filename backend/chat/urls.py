from django.urls import path
from .views import MessageViewSet

message_list = MessageViewSet.as_view({
    "get": "list",
    "post": "create",
})

message_detail = MessageViewSet.as_view({
    "patch": "partial_update",
    "put": "update",
    "delete": "destroy",
})

urlpatterns = [
    path(
        "api/workspaces/<int:workspace_id>/channels/<int:channel_id>/messages/",
        message_list,
        name="message-list"
    ),
    path(
        "api/workspaces/<int:workspace_id>/channels/<int:channel_id>/messages/<int:pk>/",
        message_detail,
        name="message-detail"
    ),
]