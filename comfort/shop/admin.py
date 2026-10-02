from django.contrib import admin
from .models import Category, Product, Review, NewsletterSubscriber, ContactMessage

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'description')
    search_fields = ('name', 'description')
    prepopulated_fields = {'slug': ('name',)}


class ReviewInline(admin.TabularInline):
    model = Review
    extra = 1


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'original_price', 'stock', 'is_new', 'is_featured', 'rating', 'review_count', 'created_at')
    list_filter = ('category', 'is_new', 'is_featured', 'rating', 'created_at')
    search_fields = ('name', 'description', 'category__name')
    prepopulated_fields = {'slug': ('name',)}
    list_editable = ('price', 'stock', 'is_new', 'is_featured')
    inlines = [ReviewInline]
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'slug', 'category', 'description')
        }),
        ('Pricing & Inventory', {
            'fields': ('price', 'original_price', 'stock')
        }),
        ('Visuals & Media', {
            'fields': ('image', 'image_url', 'secondary_image')
        }),
        ('Variants & Sizing', {
            'fields': ('size', 'color')
        }),
        ('Badges & Engagement', {
            'fields': ('is_new', 'is_featured', 'rating', 'review_count')
        }),
    )


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('product', 'name', 'rating', 'created_at')
    list_filter = ('rating', 'created_at')
    search_fields = ('name', 'comment', 'product__name')


@admin.register(NewsletterSubscriber)
class NewsletterSubscriberAdmin(admin.ModelAdmin):
    list_display = ('email', 'subscribed_at')
    search_fields = ('email',)


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'created_at')
    search_fields = ('name', 'email', 'subject', 'message')
    readonly_fields = ('created_at',)
