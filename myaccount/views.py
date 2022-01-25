from django.shortcuts import render
from django.views import generic


class BaseTemplateView(generic.TemplateView):
    def get(self, request, *args, **kwargs):
        context = {'title': 'Peter Mwangi M. | Django Full Stack web developer'}
        # return render(request, 'build/index.html', context)
        return render(request, 'pages/index.html', context)


class AccountTemplateView(generic.TemplateView):
    def get(self, request, *args, **kwargs):
        context = super(AccountTemplateView, self).get_context_data(**kwargs)
        print((context['view'].template_name))
        user_f = None
        if request.user.is_authenticated:
            user_f = request.user.first_name
        context = {'title': user_f}
        return render(request, 'account/build/index.html', context)

