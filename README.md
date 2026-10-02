# COMFORT — OUTFITS FOR EVERY YOU
### Premium Modern Women's Fashion E-Commerce Website (Python & Django)

Comfort is a high-end women's/girls' fashion e-commerce website built with **Python & Django** featuring an editorial lookbook aesthetic, session-based shopping bag and wishlist, category navigation, product filters, reviews, and a responsive luxury layout.

---

## 🎨 Brand Identity & Color Palette

- **Primary Pink**: `#EA7B7B` (Accents, badges, active highlights)
- **Coral**: `#D25353` (Buttons, hover states, sub-labels)
- **Deep Burgundy**: `#9E3B3B` (Headings, primary CTA, announcement & footer)
- **Cream**: `#FFEAD3` (Card backgrounds, soft contrast areas)
- **Light Cream**: `#FFF8F2` (Body backdrop)
- **Dark Text**: `#2B1717` (High-contrast typography)

---

## 🚀 Quick Start Guide (Django Commands)

### 1. Install Requirements
```bash
pip install -r requirements.txt
```

### 2. Run Database Migrations
```bash
cd comfort
python manage.py migrate
```

### 3. (Optional) Seed Sample Products & Categories
```bash
python seed_db.py
```

### 4. Create Admin Superuser
```bash
python manage.py createsuperuser
```

### 5. Launch the Development Server
```bash
python manage.py runserver
```

- **Storefront Website**: [http://127.0.0.1:8000/](http://127.0.0.1:8000/)
- **Django Admin Portal**: [http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/)

---

## 📁 Architecture Directory Structure

```text
comfort/
│
├── manage.py
├── seed_db.py
│
├── comfort/
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   ├── asgi.py
│   └── wsgi.py
│
├── shop/
│   ├── migrations/
│   │   ├── __init__.py
│   │   └── 0001_initial.py
│   ├── templates/
│   │   └── shop/
│   │       ├── base.html
│   │       ├── home.html
│   │       ├── shop.html
│   │       ├── product_detail.html
│   │       ├── categories.html
│   │       ├── about.html
│   │       ├── contact.html
│   │       ├── wishlist.html
│   │       ├── cart.html
│   │       ├── checkout.html
│   │       └── order_success.html
│   │
│   ├── static/
│   │   └── shop/
│   │       ├── css/style.css
│   │       ├── js/main.js
│   │       └── images/
│   │
│   ├── admin.py
│   ├── apps.py
│   ├── models.py
│   ├── urls.py
│   ├── views.py
│   └── forms.py
│
└── requirements.txt
```

---

## ✨ Key Features

1. **Top Announcement Bar**: "Free Shipping on Orders Above $50" with quick utility links.
2. **Sticky Navigation Bar**: Comfort wordmark logo, navigation links with burgundy hover underline, search, account, wishlist counter, and cart badge.
3. **Editorial Hero Section**: Warm coral/pink visual treatment, "STYLE MEETS COMFORT", "Dress Like Your Best Self", CTA with signature hoverboard glow sweep effect, and editorial model photography.
4. **Shop by Category**: Circular cream/pink icon badges with hover elevation and color swap.
5. **New Arrivals Catalog**:
   - Floral Maxi Dress ($49.99)
   - Elegant Co-ord Set ($54.99)
   - Embroidered Kurta Set ($44.99)
   - Chic Wide Leg Pants ($39.99)
6. **Product Detail View**: Image gallery, star ratings, size selectors (XS-XL), color swatches, quantity controls, and customer reviews.
7. **Session Cart & Wishlist**: Real-time quantity updating, free shipping progress calculator, and instant checkout flow.
8. **Brand Story (About Us)**: "Comfort Is More Than Just A Brand" with 3 core pillars (Premium Quality Fabrics, Trendy & Timeless Designs, Made for Every You).
9. **Newsletter & Concierge**: Deep burgundy newsletter banner and customer styling inquiry form.
10. **Django Admin Configured**: Full management of products, categories, stock, prices, ratings, and customer inquiries with `list_display`, filters, and search.
