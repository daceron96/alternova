from django.views.generic.base import TemplateView
from django.http import JsonResponse
from supabase import create_client, Client
from project_alternova.settings import KEY_SUPABASE , URL_SUPABASE
from django.views import View
class LoginUserView(TemplateView):

    template_name = 'login.html'

    def post(self, *args, **kwargs):
        supabase: Client = create_client(URL_SUPABASE,KEY_SUPABASE)
        try:
            email : str = self.request.POST['email']
            password : str = self.request.POST['password']
            user = supabase.auth.sign_in(email=email,password=password)
            return JsonResponse({
                'token' : user.access_token
            },status = 200)
        except:
            return JsonResponse({},status = 400)


# class CreateUserView(View):

#     def post(self, *args, **kwargs):
#         supabase: Client = create_client(URL_SUPABASE,KEY_SUPABASE)
#         print(supabase)
#         # data = supabase.auth.api.create_user({email : "daceron96@gmail.com" , password: "96031110162"})
#         user = supabase.auth.sign_up(email="alejotc@unicauca.edu.co", password="96123114423")
#         print(user)
#         return JsonResponse({'holis':'holis'})