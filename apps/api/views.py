from rest_framework.response import Response
from project_alternova.settings import KEY_SUPABASE, URL_SUPABASE
from supabase import create_client, Client
from .serializers import JokeSerializer
from rest_framework import viewsets


class JokeGenericViewSet(viewsets.ViewSet):
    serializer_class = JokeSerializer
    
    def list(self, *args, **kwargs):
        supabase: Client = create_client(URL_SUPABASE, KEY_SUPABASE)
        data = supabase.table('my_joke').select('*').execute()
        joke_serializer = self.serializer_class(data.data, many=True)
        return Response(joke_serializer.data, status=200)

    def create(self, request):
        supabase: Client = create_client(URL_SUPABASE, KEY_SUPABASE)
        new_joke = request.data
        try:
            data = supabase.table('my_joke').insert({
                'value': new_joke['value'],
                'id_joke': new_joke['id_joke']
            }).execute()
            serialize = self.serializer_class(data.data, many = True)
            return Response(serialize.data, status=200)
        except:
            return Response({'error': "This joke already save"}, status = 400)

    def put(self, request):
        
        supabase = Client = create_client(URL_SUPABASE, KEY_SUPABASE)
        my_joke = request.data
        data = supabase.table('my_joke').update(
            {'value' : my_joke['value']}
            ).eq(
                'id_joke', my_joke['id_joke']
                ).execute()
        if(len(data.data) > 0):
            serialize = self.serializer_class(data.data, many = True)
            return Response(serialize.data, status=200)
        return Response({'error': "This joke doesn't exist"}, status = 400)

    def delete(self,request,pk = None):
        
        supabase = Client = create_client(URL_SUPABASE, KEY_SUPABASE)
        my_joke = request.data
        data = supabase.table('my_joke').delete().eq('id_joke',my_joke['id_joke']).execute()
        if(len(data.data) > 0):
            return Response({'message':'delete'}, status=200)
        return Response({'error': "This joke doesn't exist"}, status = 400)
