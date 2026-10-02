from django.shortcuts import render, get_object_or_404, redirect
from django.http import JsonResponse
from django.contrib import messages
from django.db.models import Q
from .models import Category, Product, Review, NewsletterSubscriber, ContactMessage
from .forms import NewsletterForm, ContactForm, ReviewForm

def cart_and_wishlist_context(request):
    """Context processor making cart and wishlist counts available to all templates."""
    cart = request.session.get('cart', {})
    wishlist = request.session.get('wishlist', [])
    cart_count = sum(item.get('quantity', 1) for item in cart.values())
    wishlist_count = len(wishlist)
    return {
        'cart_count': cart_count,
        'wishlist_count': wishlist_count,
    }

def home(request):
    """Homepage rendering hero, categories, new arrivals, brand story, and newsletter."""
    categories = Category.objects.all()[:8]
    new_arrivals = Product.objects.filter(is_new=True)[:4]
    if not new_arrivals.exists():
        new_arrivals = Product.objects.all()[:4]
    
    newsletter_form = NewsletterForm()
    
    context = {
        'categories': categories,
        'new_arrivals': new_arrivals,
        'newsletter_form': newsletter_form,
    }
    return render(request, 'shop/home.html', context)

def shop(request):
    """Shop catalogue with filtering by category, size, price, sorting, and search."""
    products = Product.objects.all()
    categories = Category.objects.all()
    
    # Filter by category
    category_slug = request.GET.get('category')
    current_category = None
    if category_slug:
        current_category = get_object_or_404(Category, slug=category_slug)
        products = products.filter(category=current_category)

    # Search query
    query = request.GET.get('q')
    if query:
        products = products.filter(
            Q(name__icontains=query) |
            Q(description__icontains=query) |
            Q(category__name__icontains=query)
        )

    # Filter by size
    size_filter = request.GET.get('size')
    if size_filter:
        products = products.filter(size__icontains=size_filter)

    # Filter by price max
    price_max = request.GET.get('price_max')
    if price_max:
        try:
            products = products.filter(price__lte=float(price_max))
        except ValueError:
            pass

    # Sort options
    sort_by = request.GET.get('sort', 'featured')
    if sort_by == 'newest':
        products = products.order_by('-created_at')
    elif sort_by == 'price_low':
        products = products.order_by('price')
    elif sort_by == 'price_high':
        products = products.order_by('-price')
    else:
        products = products.order_by('-is_featured', '-is_new', '-rating')

    context = {
        'products': products,
        'categories': categories,
        'current_category': current_category,
        'query': query,
        'selected_size': size_filter,
        'sort_by': sort_by,
        'product_count': products.count(),
    }
    return render(request, 'shop/shop.html', context)

def product_detail(request, slug):
    """Detailed view for an individual product, image gallery, sizing, and reviews."""
    product = get_object_or_404(Product, slug=slug)
    related_products = Product.objects.filter(category=product.category).exclude(id=product.id)[:4]
    review_form = ReviewForm()

    if request.method == 'POST' and 'submit_review' in request.POST:
        review_form = ReviewForm(request.POST)
        if review_form.is_valid():
            review = review_form.save(commit=False)
            review.product = product
            review.save()
            messages.success(request, "Thank you! Your review has been added.")
            return redirect('shop:product_detail', slug=product.slug)

    context = {
        'product': product,
        'related_products': related_products,
        'review_form': review_form,
    }
    return render(request, 'shop/product_detail.html', context)

def categories(request):
    """All fashion categories overview."""
    all_categories = Category.objects.all()
    return render(request, 'shop/categories.html', {'categories': all_categories})

def about(request):
    """Comfort brand story, ethos, craftsmanship, and mission."""
    return render(request, 'shop/about.html')

def contact(request):
    """Customer concierge and contact inquiry form."""
    form = ContactForm()
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, "Thank you! Your message has been received. Our styling concierge will be in touch shortly.")
            return redirect('shop:contact')
    return render(request, 'shop/contact.html', {'form': form})

# ----------------- Cart Views (Session-Based) -----------------

def cart(request):
    """Shopping bag view with itemized products, subtotal, and checkout options."""
    cart_session = request.session.get('cart', {})
    cart_items = []
    subtotal = 0.0

    for item_key, item_data in cart_session.items():
        try:
            prod = Product.objects.get(id=item_data['product_id'])
            total_item_price = float(prod.price) * item_data['quantity']
            subtotal += total_item_price
            cart_items.append({
                'key': item_key,
                'product': prod,
                'quantity': item_data['quantity'],
                'size': item_data.get('size', 'M'),
                'total_price': total_item_price,
            })
        except Product.DoesNotExist:
            continue

    shipping = 0.0 if subtotal >= 50.0 or subtotal == 0 else 5.99
    total = subtotal + shipping

    context = {
        'cart_items': cart_items,
        'subtotal': subtotal,
        'shipping': shipping,
        'total': total,
        'free_shipping_threshold': 50.0,
        'free_shipping_difference': max(0.0, 50.0 - subtotal),
    }
    return render(request, 'shop/cart.html', context)

def cart_add(request, product_id):
    """Add a product to the cart with optional size selection."""
    product = get_object_or_404(Product, id=product_id)
    cart = request.session.get('cart', {})
    
    size = request.POST.get('size', 'M')
    quantity = int(request.POST.get('quantity', 1))
    
    item_key = f"{product.id}_{size}"
    if item_key in cart:
        cart[item_key]['quantity'] += quantity
    else:
        cart[item_key] = {
            'product_id': product.id,
            'quantity': quantity,
            'size': size,
        }
    
    request.session['cart'] = cart
    request.session.modified = True
    messages.success(request, f"Added {product.name} ({size}) to your bag.")
    
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        return JsonResponse({'status': 'ok', 'cart_count': sum(i['quantity'] for i in cart.values())})
    return redirect(request.META.get('HTTP_REFERER', 'shop:cart'))

def cart_update(request, item_key):
    """Update item quantity in cart."""
    cart = request.session.get('cart', {})
    if item_key in cart:
        action = request.POST.get('action')
        if action == 'increase':
            cart[item_key]['quantity'] += 1
        elif action == 'decrease':
            cart[item_key]['quantity'] -= 1
            if cart[item_key]['quantity'] <= 0:
                del cart[item_key]
        request.session['cart'] = cart
        request.session.modified = True
    return redirect('shop:cart')

def cart_remove(request, item_key):
    """Remove item completely from cart."""
    cart = request.session.get('cart', {})
    if item_key in cart:
        del cart[item_key]
        request.session['cart'] = cart
        request.session.modified = True
        messages.info(request, "Item removed from bag.")
    return redirect('shop:cart')

# ----------------- Wishlist Views (Session-Based) -----------------

def wishlist(request):
    """Wishlist page displaying saved favorites."""
    wishlist_ids = request.session.get('wishlist', [])
    products = Product.objects.filter(id__in=wishlist_ids)
    return render(request, 'shop/wishlist.html', {'products': products})

def wishlist_toggle(request, product_id):
    """Toggle product in user's session wishlist."""
    product = get_object_or_404(Product, id=product_id)
    wishlist = request.session.get('wishlist', [])
    
    if product.id in wishlist:
        wishlist.remove(product.id)
        is_saved = False
        messages.info(request, f"Removed {product.name} from wishlist.")
    else:
        wishlist.append(product.id)
        is_saved = True
        messages.success(request, f"Saved {product.name} to your wishlist.")
        
    request.session['wishlist'] = wishlist
    request.session.modified = True

    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        return JsonResponse({'status': 'ok', 'is_saved': is_saved, 'wishlist_count': len(wishlist)})
    return redirect(request.META.get('HTTP_REFERER', 'shop:wishlist'))

def checkout(request):
    """Checkout process placeholder."""
    cart_session = request.session.get('cart', {})
    if not cart_session:
        messages.warning(request, "Your bag is empty.")
        return redirect('shop:shop')
    
    if request.method == 'POST':
        # Clear cart on successful order placement
        request.session['cart'] = {}
        request.session.modified = True
        messages.success(request, "Thank you! Your order #CF-884129 has been placed. We're preparing your shipment!")
        return render(request, 'shop/order_success.html', {'order_id': 'CF-884129'})

    return render(request, 'shop/checkout.html')

def newsletter_subscribe(request):
    """Handle newsletter form submission."""
    if request.method == 'POST':
        form = NewsletterForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, "Welcome to the Comfort family! Check your inbox for style inspiration and 10% off.")
        else:
            messages.info(request, "You are already subscribed to Comfort newsletters.")
    return redirect(request.META.get('HTTP_REFERER', 'shop:home'))
