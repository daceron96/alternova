from django.views.generic.base import TemplateView
from django.views import View
import requests
from supabase import create_client, Client
from django.http import JsonResponse
from project_alternova.settings import KEY_SUPABASE, URL_SUPABASE


class JokesTemplateView(TemplateView):
    template_name = 'jokes.html'

    # def get_context_data(self, **kwargs):
    #     context = super().get_context_data(**kwargs)
    #     supabase: Client = create_client(URL_SUPABASE,KEY_SUPABASE)
    #     context['data'] = supabase.table("my_joke").select("*").execute()
    #     print(context)
    #     return context


class ListJokeView(View):
    
    def get(self, *args, **kwargs):
        supabase: Client = create_client(URL_SUPABASE,KEY_SUPABASE)
        token = self.request.headers['jwt']
        try:
            user = supabase.auth.api.get_user(jwt = token)
            data = supabase.table('my_joke').select('*').execute()
            joke_list = []
            for joke in data.data:
                item = {
                    'id_joke' : joke['id_joke'],
                    'value' : joke['value'],
                }
                joke_list.append(item)
            
            joke = (requests.get('https://api.chucknorris.io/jokes/random')).json()

            return JsonResponse({'data':joke_list, 'joke':joke, 'email':user.email}, status = 200)
        except:
            return JsonResponse({'error':'The sesion has expired please authenticate again'},status = 401)

class GetJokeView(View):

    def post(self, *args, **kwargs):
        supabase: Client = create_client(URL_SUPABASE,KEY_SUPABASE)
        token = self.request.headers['jwt']
        try:        
            supabase.auth.api.get_user(jwt = token)
            joke = (requests.get('https://api.chucknorris.io/jokes/random')).json()
            return JsonResponse(joke,status = 200)
        except:
            return JsonResponse({'error': "The sesion has expired please authenticate again"},status = 401)

class CreateJokeView(View):

    def post(self, *args, **kwargs):

        supabase: Client = create_client(URL_SUPABASE,KEY_SUPABASE)
        new_joke = self.request.POST
        token = self.request.headers['jwt']
        
        try:
            supabase.auth.api.get_user(jwt = token)
        except:
            return JsonResponse({'message': 'The sesion has expired please authenticate again'}, status = 401 )

        try:
            supabase.table('my_joke').insert({
                'value' : new_joke['value'],
                'id_joke': new_joke['id_joke']
            }).execute()
            return JsonResponse({"message":"Joke saved successfully"},status = 200)
        except:
            return JsonResponse({
                "message": 'This joke already save'
            },status = 400)

