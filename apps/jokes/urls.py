from django.urls import path

from .views import JokesTemplateView, GetJokeView,CreateJokeView,ListJokeView

jokes_patterns = ([
        
    path('',JokesTemplateView.as_view(), name = 'jokes'),
    path('get-joke/',GetJokeView.as_view(), name = 'get_joke'),
    path('create-joke/',CreateJokeView.as_view(), name = 'create_joke'),
    path('list-jokes/',ListJokeView.as_view(), name = 'list_jokes'),


],'jokes')