from django.urls import path
from .views import ChannelViewSet

channel_list = ChannelViewSet.as_view({
    "get": "list",
    "post": "create"
})

channel_detail = ChannelViewSet.as_view({
    "delete": "destroy",
})

urlpatterns = [
    path(
        "api/workspaces/<int:workspace_id>/channels/",
        channel_list,
        name="channel-list"
    ),
    path(
        "api/workspaces/<int:workspace_id>/channels/<int:pk>/",
        channel_detail,
        name="channel-detail"
    ),
]