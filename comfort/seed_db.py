#!/usr/bin/env python
"""
Seed script to populate Comfort database with initial categories and new arrival products.
Usage:
  python manage.py migrate
  python seed_db.py
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'comfort.settings')
django.setup()

from shop.models import Category, Product

def run():
    print("Seeding Comfort Boutique Database...")

    # Categories
    categories_data = [
        {"name": "Dresses", "icon_name": "person-dress", "description": "Flowy maxis, midi sundresses, and evening wraps."},
        {"name": "Tops & Shirts", "icon_name": "shirt", "description": "Breathable cotton blousons, silk camisoles, and shirts."},
        {"name": "Bottoms", "icon_name": "vest", "description": "Wide leg trousers, linen culottes, and breezy skirts."},
        {"name": "Co-ords", "icon_name": "wand-magic-sparkles", "description": "Effortless matching tops and bottoms for elevated comfort."},
        {"name": "Outerwear", "icon_name": "cloud-sun", "description": "Lightweight duster coats, trench capes, and knit cardigans."},
        {"name": "Accessories", "icon_name": "gem", "description": "Minimalist scarves, woven leather totes, and artisanal earrings."},
        {"name": "Footwear", "icon_name": "shoe-prints", "description": "Buttery soft leather sandals, mule flats, and woven slides."},
    ]

    cat_map = {}
    for c_data in categories_data:
        cat, created = Category.objects.get_or_create(
            name=c_data["name"],
            defaults={"icon_name": c_data["icon_name"], "description": c_data["description"]}
        )
        cat_map[c_data["name"]] = cat
        print(f"Category: {cat.name} ({'Created' if created else 'Exists'})")

    # Products
    products_data = [
        {
            "name": "Floral Maxi Dress",
            "category": cat_map["Dresses"],
            "price": 49.99,
            "original_price": 69.99,
            "description": "Crafted from whisper-light breathable chiffon, featuring a delicate blush and coral floral print, feminine tiered skirt, and adjustable waist cincher.",
            "image_url": "/static/shop/images/floral-maxi.jpg",
            "size": "XS, S, M, L, XL",
            "color": "Blush Floral, Coral Bloom",
            "stock": 45,
            "is_new": True,
            "is_featured": True,
            "rating": 5.0,
            "review_count": 24,
        },
        {
            "name": "Elegant Co-ord Set",
            "category": cat_map["Co-ords"],
            "price": 54.99,
            "original_price": 75.00,
            "description": "A tailored silhouette made from organic washed linen. Includes a relaxed mock-neck tunic with matching high-rise pleat trousers designed for all-day comfort.",
            "image_url": "/static/shop/images/coord-set.jpg",
            "size": "XS, S, M, L, XL",
            "color": "Dusty Rose, Terracotta Blush",
            "stock": 38,
            "is_new": True,
            "is_featured": True,
            "rating": 4.9,
            "review_count": 19,
        },
        {
            "name": "Embroidered Kurta Set",
            "category": cat_map["Dresses"],
            "price": 44.99,
            "original_price": 59.99,
            "description": "Intricate hand-embroidered neckline, side slits, and comfortable wide-leg palazzo pants. Lightweight cotton silk blend with subtle golden thread highlights.",
            "image_url": "/static/shop/images/embroidered-kurta.jpg",
            "size": "XS, S, M, L, XL",
            "color": "Pastel Coral, Pearl Cream",
            "stock": 50,
            "is_new": True,
            "is_featured": True,
            "rating": 5.0,
            "review_count": 32,
        },
        {
            "name": "Chic Wide Leg Pants",
            "category": cat_map["Bottoms"],
            "price": 39.99,
            "original_price": 52.00,
            "description": "Ultra-flattering high waist cut with deep pockets and an elasticized rear waistband. Made from eco-friendly modal fabric with fluid drape.",
            "image_url": "/static/shop/images/hero.jpg",
            "size": "XS, S, M, L, XL",
            "color": "Warm Sand, Cinnamon Cream",
            "stock": 60,
            "is_new": True,
            "is_featured": True,
            "rating": 4.8,
            "review_count": 18,
        }
    ]

    for p_data in products_data:
        p, created = Product.objects.get_or_create(
            name=p_data["name"],
            defaults=p_data
        )
        print(f"Product: {p.name} ({'Created' if created else 'Exists'})")

    print("\nDatabase seeded successfully!")

if __name__ == '__main__':
    run()
