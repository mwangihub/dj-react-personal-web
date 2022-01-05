from django.shortcuts import render
from django.views import generic


class BaseTemplateView(generic.TemplateView):
    def get(self, request, *args, **kwargs):
        context = {'title': 'Powered by django'}
        return render(request, 'pages/home.html', context)
        # return render(request, 'pages/index.html', context)


class AccountTemplateView(generic.TemplateView):

    # def get_context_data(self, **kwargs):
    #     context = super(AccountTemplateView, self).get_context_data(**kwargs)
    #     print('test get_context_data', self.some_data)

    def get(self, request, *args, **kwargs):
        context = super(AccountTemplateView, self).get_context_data(**kwargs)
        print((context['view'].template_name))
        user_f = None
        if request.user.is_authenticated:
            user_f = request.user.first_name
        context = {'title': user_f}
        return render(request, 'account/build/index.html', context)

