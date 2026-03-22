// ============================================================
//  AURA - Real Estate App | app.js
//  Pure frontend: HTML + CSS + JS + localStorage
// ============================================================

// --- Get DOM Elements ---
var propertiesGrid = document.getElementById('properties-grid');
var searchInput    = document.getElementById('search-input');
var typeFilter     = document.getElementById('type-filter');
var priceFilter    = document.getElementById('price-filter');
var addPropertyBtn = document.getElementById('add-property-btn');
var modalOverlay   = document.getElementById('modal-overlay');
var closeModalBtn  = document.getElementById('close-modal');
var addPropertyForm = document.getElementById('add-property-form');
var navLinks       = document.querySelectorAll('.nav-link');
var sectionTitle   = document.getElementById('section-title');
var propertyCount  = document.getElementById('property-count');

// --- Track which view we are in ---
var currentFilter = 'all'; // 'all' or 'favorites'

// --- Format price as Indian currency ---
function formatCurrency(value) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(value);
}

// --- Build HTML for one property card ---
function createCardHTML(property) {
    var isFav = DataService.isFavorite(property.id);
    var favClass = isFav ? 'active' : '';
    var heartIcon = isFav ? 'fa-solid fa-heart' : 'fa-regular fa-heart';

    var metaHTML = '';
    if (property.type !== 'Plot') {
        metaHTML = '<div class="property-meta">' +
            '<div class="meta-item"><i class="fa-solid fa-bed"></i> ' + property.bedrooms + ' Beds</div>' +
            '<div class="meta-item"><i class="fa-solid fa-bath"></i> ' + property.bathrooms + ' Baths</div>' +
            '<div class="meta-item"><i class="fa-solid fa-vector-square"></i> ' + property.area + ' sqft</div>' +
        '</div>';
    } else {
        metaHTML = '<div class="property-meta">' +
            '<div class="meta-item"><i class="fa-solid fa-vector-square"></i> ' + property.area + ' sqft</div>' +
        '</div>';
    }

    return '<a href="property.html?id=' + property.id + '" class="property-card glass-panel">' +
        '<div class="card-image-wrapper">' +
            '<img src="' + property.image + '" alt="' + property.title + '" class="card-image" loading="lazy">' +
        '</div>' +
        '<div class="card-overlay"></div>' +
        '<div class="property-type">' + property.type + '</div>' +
        '<div class="fav-btn ' + favClass + '" onclick="toggleFav(event, \'' + property.id + '\')" aria-label="Toggle Favorite">' +
            '<i class="' + heartIcon + '"></i>' +
        '</div>' +
        '<div class="card-content">' +
            '<div class="property-price">' + formatCurrency(property.price) + '</div>' +
            '<h3 class="property-title">' + property.title + '</h3>' +
            '<div class="property-location"><i class="fa-solid fa-location-dot"></i> ' + property.location + '</div>' +
            metaHTML +
            '<div class="view-btn-container"><button class="view-btn">View Details &rarr;</button></div>' +
        '</div>' +
    '</a>';
}

// --- Render list of properties into the grid ---
function renderProperties(properties) {
    if (!propertiesGrid) return;

    propertiesGrid.innerHTML = '';

    // Update count badge
    if (propertyCount) {
        propertyCount.textContent = properties.length + ' Propert' + (properties.length === 1 ? 'y' : 'ies');
    }

    // Show empty message if nothing matches
    if (properties.length === 0) {
        propertiesGrid.innerHTML =
            '<div class="empty-state">' +
                '<i class="fa-solid fa-house-circle-xmark"></i>' +
                '<h3>No properties found</h3>' +
                '<p>Try adjusting your search or filters.</p>' +
            '</div>';
        return;
    }

    // Build and insert all cards
    var html = '';
    for (var i = 0; i < properties.length; i++) {
        html += createCardHTML(properties[i]);
    }
    propertiesGrid.innerHTML = html;

    // Animate cards in using GSAP (if available)
    if (typeof gsap !== 'undefined') {
        gsap.fromTo('.property-card',
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power2.out' }
        );
    }
}

// --- Apply search + filter + view filters ---
function applyFilters() {
    var all = DataService.getProperties();

    // Filter: Explore vs Favorites tab
    var result = all;
    if (currentFilter === 'favorites') {
        var favIds = DataService.getFavorites();
        result = all.filter(function(p) { return favIds.indexOf(p.id) !== -1; });
    }

    // Filter: Search box
    if (searchInput && searchInput.value.trim() !== '') {
        var query = searchInput.value.trim().toLowerCase();
        result = result.filter(function(p) {
            return p.location.toLowerCase().indexOf(query) !== -1 ||
                   p.title.toLowerCase().indexOf(query) !== -1;
        });
    }

    // Filter: Property type
    if (typeFilter && typeFilter.value !== '') {
        result = result.filter(function(p) { return p.type === typeFilter.value; });
    }

    // Filter: Max price
    if (priceFilter && priceFilter.value !== '') {
        var maxPrice = parseInt(priceFilter.value, 10);
        result = result.filter(function(p) { return p.price <= maxPrice; });
    }

    renderProperties(result);
}

// --- Search and filter event listeners ---
if (searchInput) searchInput.addEventListener('input', applyFilters);
if (typeFilter)  typeFilter.addEventListener('change', applyFilters);
if (priceFilter) priceFilter.addEventListener('change', applyFilters);

// --- Top nav tab switching (Explore / Favorites) ---
navLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
        e.preventDefault();

        navLinks.forEach(function(l) { l.classList.remove('active'); });
        link.classList.add('active');

        currentFilter = link.dataset.filter || 'all';

        if (sectionTitle) {
            sectionTitle.textContent = currentFilter === 'favorites' ? 'Your Favorites' : 'Exclusive Listings';
        }

        applyFilters();
    });
});

// --- Toggle Favorite heart button ---
// This is on window so it can be called from inline onclick in the card HTML
window.toggleFav = function(event, id) {
    event.preventDefault();
    event.stopPropagation();

    var isNowFav = DataService.toggleFavorite(id);
    var btn  = event.currentTarget;
    var icon = btn.querySelector('i');

    if (isNowFav) {
        btn.classList.add('active');
        icon.classList.replace('fa-regular', 'fa-solid');
        showToast('\u2764\ufe0f Added to Favorites');
    } else {
        btn.classList.remove('active');
        icon.classList.replace('fa-solid', 'fa-regular');
        showToast('Removed from Favorites');
    }

    // If viewing favorites tab, re-render so removed ones disappear
    if (currentFilter === 'favorites') {
        applyFilters();
    }
};

// --- Modal: open ---
if (addPropertyBtn) {
    addPropertyBtn.addEventListener('click', function(e) {
        e.preventDefault();
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

// --- Modal: close button ---
if (closeModalBtn) {
    closeModalBtn.addEventListener('click', function() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

// --- Modal: click outside to close ---
if (modalOverlay) {
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// --- Form submission: add new property ---
if (addPropertyForm) {
    addPropertyForm.addEventListener('submit', function(e) {
        e.preventDefault();

        var newProperty = {
            id:          'prop_' + Date.now(),
            title:       document.getElementById('p-title').value.trim(),
            price:       parseInt(document.getElementById('p-price').value, 10),
            location:    document.getElementById('p-location').value.trim(),
            type:        document.getElementById('p-type').value,
            area:        parseInt(document.getElementById('p-area').value, 10),
            bedrooms:    parseInt(document.getElementById('p-beds').value, 10) || 0,
            bathrooms:   parseInt(document.getElementById('p-baths').value, 10) || 0,
            image:       document.getElementById('p-image').value.trim() ||
                         'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
            description: 'A wonderful property waiting for your description.'
        };

        DataService.addProperty(newProperty);

        // Close modal and reset form
        modalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
        addPropertyForm.reset();

        applyFilters();
        showToast('\u2705 Property listed successfully!');
    });
}

// --- Toast notification ---
function showToast(message) {
    // Remove any existing toast first
    var old = document.querySelector('.toast');
    if (old) old.remove();

    var toast = document.createElement('div');
    toast.className = 'toast';                           // ← fixed: was 'toast class-panel'
    toast.innerHTML = '<i class="fa-solid fa-circle-check"></i> <span>' + message + '</span>';
    document.body.appendChild(toast);

    // Small delay to trigger CSS transition
    setTimeout(function() { toast.classList.add('show'); }, 50);

    // Auto hide after 3 seconds
    setTimeout(function() {
        toast.classList.remove('show');
        setTimeout(function() { toast.remove(); }, 400);
    }, 3000);
}

// --- Navbar shrink on scroll ---
window.addEventListener('scroll', function() {
    var nav = document.getElementById('navbar');
    if (nav) {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }
});

// --- Start the app ---
document.addEventListener('DOMContentLoaded', function() {
    if (!propertiesGrid) return; // Only run on index.html

    // Render all properties on page load
    applyFilters();

    // GSAP entrance animation for hero (GSAP is loaded in <head>)
    if (typeof gsap !== 'undefined') {
        var tl = gsap.timeline();
        tl.from('#navbar',        { y: -60, opacity: 0, duration: 0.7, ease: 'power3.out' })
          .from('#hero-title',    { y: 40,  opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3')
          .from('#hero-subtitle', { y: 30,  opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
          .from('#search-bar',    { y: 30,  opacity: 0, duration: 0.7, ease: 'back.out(1.5)' }, '-=0.4');
    }
});
