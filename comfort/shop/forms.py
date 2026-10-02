from django import forms
from .models import Review, ContactMessage, NewsletterSubscriber

class NewsletterForm(forms.ModelForm):
    class Meta:
        model = NewsletterSubscriber
        fields = ['email']
        widgets = {
            'email': forms.EmailInput(attrs={
                'class': 'w-full px-5 py-3.5 rounded-full bg-white/10 text-white placeholder-white/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-rose-300 transition text-sm',
                'placeholder': 'Enter your email address',
                'required': True,
            })
        }


class ContactForm(forms.ModelForm):
    class Meta:
        model = ContactMessage
        fields = ['name', 'email', 'subject', 'message']
        widgets = {
            'name': forms.TextInput(attrs={
                'class': 'w-full px-4 py-3 rounded-lg border border-[#FFEAD3] bg-white focus:outline-none focus:ring-2 focus:ring-[#9E3B3B] text-sm text-[#2B1717]',
                'placeholder': 'Your Full Name',
            }),
            'email': forms.EmailInput(attrs={
                'class': 'w-full px-4 py-3 rounded-lg border border-[#FFEAD3] bg-white focus:outline-none focus:ring-2 focus:ring-[#9E3B3B] text-sm text-[#2B1717]',
                'placeholder': 'your.email@example.com',
            }),
            'subject': forms.TextInput(attrs={
                'class': 'w-full px-4 py-3 rounded-lg border border-[#FFEAD3] bg-white focus:outline-none focus:ring-2 focus:ring-[#9E3B3B] text-sm text-[#2B1717]',
                'placeholder': 'How can our styling team help?',
            }),
            'message': forms.Textarea(attrs={
                'class': 'w-full px-4 py-3 rounded-lg border border-[#FFEAD3] bg-white focus:outline-none focus:ring-2 focus:ring-[#9E3B3B] text-sm text-[#2B1717] h-32 resize-none',
                'placeholder': 'Write your message or inquiry here...',
            }),
        }


class ReviewForm(forms.ModelForm):
    class Meta:
        model = Review
        fields = ['name', 'rating', 'comment']
        widgets = {
            'name': forms.TextInput(attrs={
                'class': 'w-full px-3 py-2 border rounded-md text-sm',
                'placeholder': 'Your Name',
            }),
            'rating': forms.Select(choices=[(5, '★★★★★ (5/5)'), (4, '★★★★☆ (4/5)'), (3, '★★★☆☆ (3/5)'), (2, '★★☆☆☆ (2/5)'), (1, '★☆☆☆☆ (1/5)')], attrs={
                'class': 'w-full px-3 py-2 border rounded-md text-sm',
            }),
            'comment': forms.Textarea(attrs={
                'class': 'w-full px-3 py-2 border rounded-md text-sm h-24',
                'placeholder': 'Share your fit, fabric, and styling experience...',
            }),
        }
