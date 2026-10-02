/**
 * Comfort - Outfits For Every You
 * Main Frontend JavaScript for Django Storefront
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu-drawer');
  
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', mobileMenu.classList.contains('open'));
    });
  }

  // Wishlist Toggle via Fetch / AJAX
  const wishlistButtons = document.querySelectorAll('.wishlist-toggle');
  wishlistButtons.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const productId = btn.dataset.productId;
      if (!productId) return;

      try {
        const response = await fetch(`/wishlist/toggle/${productId}/`, {
          method: 'GET',
          headers: {
            'X-Requested-With': 'XMLHttpRequest'
          }
        });
        const data = await response.json();
        
        if (data.status === 'ok') {
          btn.classList.toggle('active', data.is_saved);
          
          // Animate heart
          btn.style.transform = 'scale(1.25)';
          setTimeout(() => {
            btn.style.transform = '';
          }, 250);

          // Update header count badge
          const badge = document.querySelector('.wishlist-badge');
          if (badge) {
            badge.textContent = data.wishlist_count;
            badge.style.display = data.wishlist_count > 0 ? 'flex' : 'none';
          }
          
          showToast(data.is_saved ? 'Added to your Wishlist!' : 'Removed from Wishlist.');
        }
      } catch (err) {
        console.error('Wishlist error:', err);
      }
    });
  });

  // Quantity Controls in PDP and Cart
  const qtyWrappers = document.querySelectorAll('.quantity-selector');
  qtyWrappers.forEach(wrap => {
    const decBtn = wrap.querySelector('.qty-dec');
    const incBtn = wrap.querySelector('.qty-inc');
    const input = wrap.querySelector('.qty-input');

    if (decBtn && incBtn && input) {
      decBtn.addEventListener('click', () => {
        let val = parseInt(input.value, 10) || 1;
        if (val > 1) {
          input.value = val - 1;
          input.dispatchEvent(new Event('change'));
        }
      });

      incBtn.addEventListener('click', () => {
        let val = parseInt(input.value, 10) || 1;
        if (val < 10) {
          input.value = val + 1;
          input.dispatchEvent(new Event('change'));
        }
      });
    }
  });

  // Minimal Toast Notification
  function showToast(message) {
    let toast = document.querySelector('.comfort-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'comfort-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('visible');
    setTimeout(() => {
      toast.classList.remove('visible');
    }, 2800);
  }
});
