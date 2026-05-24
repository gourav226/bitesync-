// BiteSync — Premium Food Delivery Single Page Application (app.js)

// Application State
let RESTAURANTS = [];
let appState = {
    restaurants: [],
    filteredRestaurants: [],
    cart: JSON.parse(localStorage.getItem('bitesync-cart')) || [],
    couponApplied: JSON.parse(localStorage.getItem('bitesync-coupon')) || null,
    activeFilter: 'all',
    sortBy: 'relevance',
    searchQuery: '',
    selectedCategory: '',
    selectedRestaurant: null
};

// Cuisine categories
const CUISINE_CATEGORIES = [
    { name: "Biryani", emoji: "🍛", keyword: "Biryani" },
    { name: "Burgers", emoji: "🍔", keyword: "Burgers" },
    { name: "Pizza", emoji: "🍕", keyword: "Pizza" },
    { name: "Desserts", emoji: "🍰", keyword: "Desserts" },
    { name: "Chinese", emoji: "🥢", keyword: "Chinese" },
    { name: "Healthy", emoji: "🥗", keyword: "Healthy" },
    { name: "North Indian", emoji: "🫓", keyword: "North Indian" },
    { name: "South Indian", emoji: "🥞", keyword: "South Indian" },
    { name: "Rolls", emoji: "🌯", keyword: "Rolls" },
    { name: "Seafood", emoji: "🦐", keyword: "Seafood" },
    { name: "Momos", emoji: "🥟", keyword: "Momos" },
    { name: "Coffee", emoji: "☕", keyword: "Coffee" }
];

// Apply theme immediately to avoid flash of light mode
document.documentElement.setAttribute("data-theme", localStorage.getItem("bitesync-theme") || "light");

// DOMContentLoaded Entry Point
document.addEventListener("DOMContentLoaded", async () => {
    setupThemeToggle();
    setupCommonEventListeners();
    loadCategoryCarousel();
    setupCarouselNavigation();
    updateCartCount();

    // Show initial skeleton loaders
    const featuredGrid = document.getElementById("featuredGrid");
    if (featuredGrid) {
        featuredGrid.innerHTML = `
            <div class="skeleton-card"></div>
            <div class="skeleton-card"></div>
            <div class="skeleton-card"></div>
            <div class="skeleton-card"></div>`;
    }

    try {
        const response = await fetch('/api/restaurants');
        if (!response.ok) throw new Error('API offline');
        RESTAURANTS = await response.json();
    } catch (err) {
        console.warn('[BiteSync] API offline, loading static fallback data.');
        RESTAURANTS = getFallbackData();
    }

    appState.restaurants = [...RESTAURANTS];
    appState.filteredRestaurants = [...RESTAURANTS];

    renderFeaturedRestaurants();
    renderRestaurantsGrid();
    
    // Check if there was an active order in progress to resume tracker
    if (localStorage.getItem('bitesync-active-order')) {
        showView('trackingView');
        resumeLiveOrderSimulation();
    } else {
        showView('homeView');
    }
});

// Sound Alerts Utility (TTS Synthesis)
function playSystemVoice(message) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const speech = new SpeechSynthesisUtterance(message);
        speech.rate = 1.05;
        speech.pitch = 1.0;
        speech.volume = 0.95;
        window.speechSynthesis.speak(speech);
    }
}

// SPA View Switcher
function showView(viewId) {
    document.querySelectorAll(".view-section").forEach(view => {
        view.style.display = "none";
    });
    const activeView = document.getElementById(viewId);
    if (activeView) {
        activeView.style.display = "block";
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Setup Theme switching
function setupThemeToggle() {
    const themeToggle = document.getElementById("themeToggle");
    if (!themeToggle) return;

    themeToggle.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const nextTheme = currentTheme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", nextTheme);
        localStorage.setItem("bitesync-theme", nextTheme);
        
        themeToggle.style.transform = "rotate(360deg)";
        setTimeout(() => { themeToggle.style.transform = ""; }, 400);
    });
}

// Horizontal scroll buttons on category carousel
function setupCarouselNavigation() {
    const prevBtn = document.getElementById("carouselPrev");
    const nextBtn = document.getElementById("carouselNext");
    const trackContainer = document.querySelector(".carousel-track-container");
    
    if (prevBtn && nextBtn && trackContainer) {
        prevBtn.addEventListener("click", () => {
            trackContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });
        nextBtn.addEventListener("click", () => {
            trackContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
    }
}

// Load Cuisines Mind Carousel
function loadCategoryCarousel() {
    const categoryTrack = document.getElementById("categoryTrack");
    if (!categoryTrack) return;
    
    categoryTrack.innerHTML = "";
    CUISINE_CATEGORIES.forEach(cat => {
        const card = document.createElement("div");
        card.className = "category-card";
        card.innerHTML = `
            <div class="category-image-wrap">${cat.emoji}</div>
            <span>${cat.name}</span>
        `;
        card.addEventListener("click", () => {
            // Switch to restaurants view and filter by category
            appState.selectedCategory = cat.keyword;
            appState.activeFilter = 'all';
            
            // Mark category active
            document.querySelectorAll(".category-card .category-image-wrap").forEach(item => {
                item.style.borderColor = "";
            });
            card.querySelector(".category-image-wrap").style.borderColor = "var(--primary)";

            // Update filter list UI
            document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
            const allFilterBtn = document.querySelector('.filter-btn[data-filter="all"]');
            if (allFilterBtn) allFilterBtn.classList.add("active");

            filterRestaurants();
            showView('restaurantsView');
        });
        categoryTrack.appendChild(card);
    });
}

// Common Event Listeners (Header, Cart Drawer, Checkout Page, etc.)
function setupCommonEventListeners() {
    // Logo Click (Back to Home)
    const logoBtn = document.getElementById("logoBtn");
    if (logoBtn) {
        logoBtn.addEventListener("click", () => {
            appState.selectedCategory = "";
            document.querySelectorAll(".category-card .category-image-wrap").forEach(item => {
                item.style.borderColor = "";
            });
            showView('homeView');
        });
    }

    // View All Restaurants Button on Home
    const viewAllBtn = document.getElementById("viewAllBtn");
    if (viewAllBtn) {
        viewAllBtn.addEventListener("click", () => {
            appState.selectedCategory = "";
            appState.activeFilter = 'all';
            document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
            const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
            if (allBtn) allBtn.classList.add("active");
            filterRestaurants();
            showView('restaurantsView');
        });
    }

    // Live Search input filter
    const globalSearch = document.getElementById("globalSearch");
    if (globalSearch) {
        globalSearch.addEventListener("input", (e) => {
            appState.searchQuery = e.target.value;
            filterRestaurants();
            if (document.getElementById("restaurantsView").style.display === "none") {
                showView("restaurantsView");
            }
        });
    }

    // Header Offers Link
    const offersBtn = document.getElementById("offersBtn");
    if (offersBtn) {
        offersBtn.addEventListener("click", (e) => {
            e.preventDefault();
            appState.activeFilter = "offers";
            document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
            const offersFilter = document.querySelector('.filter-btn[data-filter="offers"]');
            if (offersFilter) offersFilter.classList.add("active");
            filterRestaurants();
            showView("restaurantsView");
        });
    }

    // Sort Selector dropdown
    const sortBySelect = document.getElementById("sortBy");
    if (sortBySelect) {
        sortBySelect.addEventListener("change", (e) => {
            appState.sortBy = e.target.value;
            filterRestaurants();
        });
    }

    // Grid filter buttons
    const filterButtons = document.querySelectorAll(".filter-btn");
    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            appState.activeFilter = btn.getAttribute("data-filter");
            filterRestaurants();
        });
    });

    // Cart trigger opening drawer
    const cartTrigger = document.getElementById("cartTrigger");
    const cartDrawerOverlay = document.getElementById("cartDrawerOverlay");
    const cartCloseBtn = document.getElementById("cartCloseBtn");
    const fillCartBtn = document.getElementById("fillCartBtn");

    if (cartTrigger && cartDrawerOverlay) {
        cartTrigger.addEventListener("click", () => {
            cartDrawerOverlay.classList.add("open");
            renderCartItems();
        });
    }
    if (cartCloseBtn && cartDrawerOverlay) {
        cartCloseBtn.addEventListener("click", () => {
            cartDrawerOverlay.classList.remove("open");
        });
    }
    if (cartDrawerOverlay) {
        cartDrawerOverlay.addEventListener("click", (e) => {
            if (e.target === cartDrawerOverlay) cartDrawerOverlay.classList.remove("open");
        });
    }
    if (fillCartBtn && cartDrawerOverlay) {
        fillCartBtn.addEventListener("click", () => {
            cartDrawerOverlay.classList.remove("open");
            appState.selectedCategory = "";
            filterRestaurants();
            showView('restaurantsView');
        });
    }

    // Drawer Coupon code application
    const applyCouponBtn = document.getElementById("applyCouponBtn");
    if (applyCouponBtn) {
        applyCouponBtn.addEventListener("click", () => {
            validateAndApplyCoupon("couponCode", "couponMessage");
        });
    }

    // Proceed to Secure Checkout button inside Cart Drawer
    const checkoutBtn = document.getElementById("checkoutBtn");
    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", () => {
            if (cartDrawerOverlay) cartDrawerOverlay.classList.remove("open");
            renderCheckoutView();
            showView("checkoutView");
        });
    }

    // Location picker click
    const locationPicker = document.getElementById("locationPicker");
    if (locationPicker) {
        locationPicker.addEventListener("click", () => {
            const loc = prompt("Set delivery location:", "Bandra West, Mumbai");
            if (loc) {
                document.querySelector(".current-location").textContent = loc;
                playSystemVoice(`Location updated to ${loc}`);
            }
        });
    }

    // Menu category tabs (Full menu, recommended, veg)
    const menuTabs = document.getElementById("menuTabs");
    if (menuTabs) {
        menuTabs.addEventListener("click", (e) => {
            const targetTab = e.target.closest(".tab-btn");
            if (!targetTab) return;
            
            document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
            targetTab.classList.add("active");
            renderMenuItems(targetTab.getAttribute("data-category"));
        });
    }

    // Checkout Address Cards selection
    const addressCards = document.querySelectorAll(".address-card");
    addressCards.forEach(card => {
        card.addEventListener("click", () => {
            addressCards.forEach(c => c.classList.remove("selected"));
            card.classList.add("selected");
            playSystemVoice(`Delivery address selected: ${card.querySelector(".tag").textContent}`);
        });
    });

    // Checkout Payment method options
    const paymentOptions = document.querySelectorAll(".payment-option");
    paymentOptions.forEach(opt => {
        opt.addEventListener("click", () => {
            paymentOptions.forEach(o => o.classList.remove("selected"));
            opt.classList.add("selected");
            opt.querySelector("input").checked = true;
            playSystemVoice(`${opt.querySelector("strong").textContent} chosen.`);
        });
    });

    // Checkout Coupon application
    const checkoutApplyCouponBtn = document.getElementById("checkoutApplyCouponBtn");
    if (checkoutApplyCouponBtn) {
        checkoutApplyCouponBtn.addEventListener("click", () => {
            validateAndApplyCoupon("checkoutCouponCode", "checkoutCouponMessage");
            renderCheckoutSummaryValues();
        });
    }

    // Place Order pay now trigger
    const payNowBtn = document.getElementById("payNowBtn");
    if (payNowBtn) {
        payNowBtn.addEventListener("click", runCheckoutPlaceOrder);
    }
}

// Render Home View Featured snippet (renders all restaurants)
function renderFeaturedRestaurants() {
    const featuredGrid = document.getElementById("featuredGrid");
    if (!featuredGrid) return;
    featuredGrid.innerHTML = "";

    const featured = appState.restaurants;
    featured.forEach(res => {
        const card = document.createElement("div");
        card.className = "restaurant-card";
        card.innerHTML = `
            <div class="res-image">
                <img src="${res.image}" alt="${res.name}">
                <div class="discount-tag">${res.discount}</div>
            </div>
            <div class="res-details">
                <h3 class="res-name">${res.name}</h3>
                <p class="res-cuisines">${res.cuisines.join(", ")}</p>
                <div class="res-meta">
                    <div class="res-rating">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.21l8.2-1.192L12 .587z"/></svg>
                        <span>${res.rating}</span>
                    </div>
                    <div class="res-time">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:12px; height:12px;"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                        <span>${res.time} mins</span>
                    </div>
                    <div class="res-cost">₹${res.costForTwo} FOR TWO</div>
                </div>
            </div>
        `;
        card.addEventListener("click", () => openRestaurantMenu(res));
        featuredGrid.appendChild(card);
    });
}

// Master Filters and Sorting matching logic
function filterRestaurants() {
    let result = [...appState.restaurants];

    // 1. Live Search
    if (appState.searchQuery.trim() !== "") {
        const query = appState.searchQuery.toLowerCase();
        result = result.filter(res => {
            const matchesName = res.name.toLowerCase().includes(query);
            const matchesCuisines = res.cuisines.some(c => c.toLowerCase().includes(query));
            const matchesDishes = res.menu && res.menu.some(d => d.name.toLowerCase().includes(query));
            return matchesName || matchesCuisines || matchesDishes;
        });
    }

    // 2. Carousel Categories
    if (appState.selectedCategory !== "") {
        const cat = appState.selectedCategory.toLowerCase();
        result = result.filter(res => 
            res.cuisines.some(c => c.toLowerCase().includes(cat)) ||
            (res.menu && res.menu.some(d => d.name.toLowerCase().includes(cat)))
        );
    }

    // 3. Filter buttons
    const activeFiltersInfo = document.getElementById("activeFiltersInfo");
    if (appState.activeFilter === "rating") {
        result = result.filter(res => res.rating >= 4.4);
        if (activeFiltersInfo) activeFiltersInfo.textContent = "Showing top rated (4.4+ rating) gourmet restaurants";
    } else if (appState.activeFilter === "veg") {
        result = result.filter(res => res.isVeg === true);
        if (activeFiltersInfo) activeFiltersInfo.textContent = "Showing 100% Pure Vegetarian kitchens";
    } else if (appState.activeFilter === "fast") {
        result = result.filter(res => res.time <= 22);
        if (activeFiltersInfo) activeFiltersInfo.textContent = "Showing superfast delivery kitchens (under 22 mins)";
    } else if (appState.activeFilter === "new") {
        result = result.filter(res => res.isNew === true);
        if (activeFiltersInfo) activeFiltersInfo.textContent = "🆕 Showing newly launched restaurants near you";
    } else if (appState.activeFilter === "budget") {
        result = result.filter(res => res.costForTwo <= 300);
        if (activeFiltersInfo) activeFiltersInfo.textContent = "💰 Showing budget-friendly restaurants (₹300 or less for two)";
    } else if (appState.activeFilter === "offers") {
        result = result.filter(res => res.discount && res.discount !== "");
        if (activeFiltersInfo) activeFiltersInfo.textContent = "🎉 Showing restaurants with active offers & discounts";
    } else {
        if (activeFiltersInfo) {
            activeFiltersInfo.textContent = appState.selectedCategory 
                ? `Showing popular kitchens serving ${appState.selectedCategory}`
                : "Showing all popular restaurants around Bandra, Mumbai";
        }
    }

    // 4. Sorting dropdown selection
    if (appState.sortBy === "cost-asc") {
        result.sort((a, b) => a.costForTwo - b.costForTwo);
    } else if (appState.sortBy === "cost-desc") {
        result.sort((a, b) => b.costForTwo - a.costForTwo);
    } else if (appState.sortBy === "rating-desc") {
        result.sort((a, b) => b.rating - a.rating);
    } else if (appState.sortBy === "time-asc") {
        result.sort((a, b) => a.time - b.time);
    }

    appState.filteredRestaurants = result;
    renderRestaurantsGrid();
}

// Render full listing view grid
function renderRestaurantsGrid() {
    const grid = document.getElementById("restaurantGrid");
    const gridTitle = document.getElementById("restaurantGridTitle");
    if (!grid) return;
    grid.innerHTML = "";

    if (appState.filteredRestaurants.length === 0) {
        grid.innerHTML = `
            <div class="empty-state-container" style="grid-column: 1/-1; text-align: center; padding: 4rem 1rem; color: var(--text-secondary);">
                <h3>No kitchens matches your criteria</h3>
                <p>Try clearing filters or search queries to find gourmet chefs nearby!</p>
            </div>
        `;
        if (gridTitle) gridTitle.textContent = "No Matches Found";
        return;
    }

    if (gridTitle) {
        gridTitle.textContent = appState.selectedCategory 
            ? `Popular ${appState.selectedCategory} Outlets` 
            : "Top Restaurant Chains in Mumbai";
    }

    appState.filteredRestaurants.forEach(res => {
        const card = document.createElement("div");
        card.className = "restaurant-card";
        card.innerHTML = `
            <div class="res-image">
                <img src="${res.image}" alt="${res.name}">
                <div class="discount-tag">${res.discount}</div>
            </div>
            <div class="res-details">
                <h3 class="res-name">${res.name}</h3>
                <p class="res-cuisines">${res.cuisines.join(", ")}</p>
                <div class="res-meta">
                    <div class="res-rating">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.21l8.2-1.192L12 .587z"/></svg>
                        <span>${res.rating}</span>
                    </div>
                    <div class="res-time">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:12px; height:12px;"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                        <span>${res.time} mins</span>
                    </div>
                    <div class="res-cost">₹${res.costForTwo} FOR TWO</div>
                </div>
            </div>
        `;
        card.addEventListener("click", () => openRestaurantMenu(res));
        grid.appendChild(card);
    });
}

// Open Restaurant Menu detailed view
function openRestaurantMenu(res) {
    appState.selectedRestaurant = res;
    
    const banner = document.getElementById("menuHeaderBanner");
    if (banner) {
        banner.style.backgroundImage = `url(${res.image})`;
        banner.innerHTML = `
            <div class="menu-page-header-content">
                <h2 class="menu-page-header-name">${res.name}</h2>
                <div class="menu-page-header-meta">
                    <span>⭐ ${res.rating} Ratings</span>
                    <span>⏱️ ${res.time} Mins Delivery</span>
                    <span>💰 ₹${res.costForTwo} for two</span>
                </div>
            </div>
        `;
    }

    // Reset tabs
    document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
    const allTab = document.querySelector('.tab-btn[data-category="all"]');
    if (allTab) allTab.classList.add("active");

    renderMenuItems("all");
    showView("menuView");
}

// Render Menu items list
function renderMenuItems(categoryFilter) {
    const list = document.getElementById("menuItemsList");
    if (!list || !appState.selectedRestaurant) return;
    list.innerHTML = "";

    const items = appState.selectedRestaurant.menu;
    let filtered = [...items];

    if (categoryFilter === "recommended") {
        filtered = items.filter(i => i.recommended === true);
    } else if (categoryFilter === "veg") {
        filtered = items.filter(i => i.isVeg === true);
    }

    if (filtered.length === 0) {
        list.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: var(--text-secondary); font-weight: 500;">
                No dishes matches this category tab
            </div>`;
        return;
    }

    filtered.forEach(item => {
        const cartIndex = appState.cart.findIndex(c => c.item.id === item.id);
        const quantity = cartIndex !== -1 ? appState.cart[cartIndex].quantity : 0;

        const card = document.createElement("div");
        card.className = "food-item-card";
        
        let actionMarkup = "";
        if (quantity > 0) {
            actionMarkup = `
                <div class="qty-controller">
                    <button class="qty-btn" onclick="updateItemQuantity(${item.id}, -1)">-</button>
                    <span>${quantity}</span>
                    <button class="qty-btn" onclick="updateItemQuantity(${item.id}, 1)">+</button>
                </div>
            `;
        } else {
            actionMarkup = `<button class="food-add-btn" onclick="addDishToCart(${item.id})">Add</button>`;
        }

        card.innerHTML = `
            <div class="food-info">
                <span class="food-type-tag ${item.isVeg ? '' : 'non-veg'}"></span>
                <h4 class="food-title">${item.name}</h4>
                <p class="food-price">₹${item.price}</p>
                <p class="food-desc">${item.description || "Fresh and hand-cooked delicious dish prepared dynamically by the gourmet chef."}</p>
            </div>
            <div class="food-action-box">
                <img class="food-item-img" src="${item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&auto=format&fit=crop&q=60'}" alt="${item.name}">
                ${actionMarkup}
            </div>
        `;
        list.appendChild(card);
    });
}

// Add Item to cart with restrictions
function addDishToCart(itemId) {
    const item = appState.selectedRestaurant.menu.find(i => i.id === itemId);
    
    // Check if adding from different restaurant
    if (appState.cart.length > 0 && appState.cart[0].restaurantId !== appState.selectedRestaurant.id) {
        const previousRestaurant = appState.restaurants.find(r => r.id === appState.cart[0].restaurantId);
        const previousName = previousRestaurant ? previousRestaurant.name : "another restaurant";
        const confirmClear = confirm(`Your cart contains items from "${previousName}". Clear basket and add dishes from "${appState.selectedRestaurant.name}"?`);
        
        if (confirmClear) {
            appState.cart = [];
            appState.couponApplied = null;
            clearCouponMessage();
        } else {
            return;
        }
    }

    appState.cart.push({
        restaurantId: appState.selectedRestaurant.id,
        item: item,
        quantity: 1
    });

    playSystemVoice(`${item.name} added to basket.`);
    syncAndSaveCart();
    
    // Re-render
    const activeTab = document.querySelector(".tab-btn.active");
    renderMenuItems(activeTab ? activeTab.getAttribute("data-category") : "all");
}

// Update quantity
function updateItemQuantity(itemId, change) {
    const cartIndex = appState.cart.findIndex(c => c.item.id === itemId);
    if (cartIndex === -1) return;

    appState.cart[cartIndex].quantity += change;
    
    if (appState.cart[cartIndex].quantity <= 0) {
        const name = appState.cart[cartIndex].item.name;
        appState.cart.splice(cartIndex, 1);
        playSystemVoice(`${name} removed.`);
    }

    syncAndSaveCart();

    // Re-render menu
    if (appState.selectedRestaurant) {
        const activeTab = document.querySelector(".tab-btn.active");
        renderMenuItems(activeTab ? activeTab.getAttribute("data-category") : "all");
    }
    // Re-render cart drawer if open
    const drawer = document.getElementById("cartDrawerOverlay");
    if (drawer && drawer.classList.contains("open")) {
        renderCartItems();
    }
    // Re-render checkout view if open
    const checkView = document.getElementById("checkoutView");
    if (checkView && checkView.style.display !== "none") {
        renderCheckoutView();
    }
}

// Sync cart changes with localStorage
function syncAndSaveCart() {
    localStorage.setItem('bitesync-cart', JSON.stringify(appState.cart));
    localStorage.setItem('bitesync-coupon', JSON.stringify(appState.couponApplied));
    updateCartCount();
}

function updateCartCount() {
    const countEl = document.getElementById("cartCount");
    if (countEl) {
        const total = appState.cart.reduce((sum, curr) => sum + curr.quantity, 0);
        countEl.textContent = total;
        
        countEl.style.animation = "none";
        void countEl.offsetWidth; // force reflow
        countEl.style.animation = "bounceBadge 0.3s ease";
    }
}

// Clear coupon input messaging
function clearCouponMessage() {
    const codes = ["couponCode", "checkoutCouponCode"];
    const msgs = ["couponMessage", "checkoutCouponMessage"];
    codes.forEach(c => {
        const el = document.getElementById(c);
        if (el) el.value = "";
    });
    msgs.forEach(m => {
        const el = document.getElementById(m);
        if (el) el.textContent = "";
    });
}

// Validate coupon codes
function validateAndApplyCoupon(inputId, messageId) {
    const input = document.getElementById(inputId);
    const msg = document.getElementById(messageId);
    if (!input || !msg) return;

    const code = input.value.trim().toUpperCase();
    const itemTotal = appState.cart.reduce((sum, curr) => sum + (curr.item.price * curr.quantity), 0);

    if (code === "") {
        msg.textContent = "Please type a valid coupon code.";
        msg.style.color = "var(--secondary-red)";
        return;
    }

    if (code === "BITE50") {
        appState.couponApplied = { code: "BITE50", rate: 0.5 };
        msg.textContent = "Bingo! BITE50 applied successfully! 50% discount loaded.";
        msg.style.color = "var(--secondary-green)";
        playSystemVoice("Coupon applied successfully.");
    } else if (code === "FREEGRAND") {
        if (itemTotal < 400) {
            msg.textContent = "Code requires minimum order total of ₹400.";
            msg.style.color = "var(--secondary-red)";
            return;
        }
        appState.couponApplied = { code: "FREEGRAND" };
        msg.textContent = "Superb! Free Delivery charges applied.";
        msg.style.color = "var(--secondary-green)";
        playSystemVoice("Free delivery coupon applied.");
    } else {
        msg.textContent = "Invalid coupon code. Try 'BITE50'!";
        msg.style.color = "var(--secondary-red)";
        return;
    }

    // Sync input values
    const codes = ["couponCode", "checkoutCouponCode"];
    codes.forEach(c => {
        const el = document.getElementById(c);
        if (el) el.value = code;
    });

    syncAndSaveCart();
    renderCartItems();
}

// Render cart drawer items
function renderCartItems() {
    const list = document.getElementById("cartItemsContainer");
    const summary = document.getElementById("cartSummarySection");
    if (!list || !summary) return;

    if (appState.cart.length === 0) {
        list.innerHTML = `
            <div class="empty-cart-message">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                <p>Your basket is currently empty. Let's feast!</p>
            </div>
        `;
        summary.style.display = "none";
        return;
    }

    summary.style.display = "block";
    list.innerHTML = "";

    appState.cart.forEach(cartRecord => {
        const row = document.createElement("div");
        row.className = "cart-item-row";
        row.innerHTML = `
            <div class="cart-item-info">
                <p class="cart-item-name">${cartRecord.item.name}</p>
                <p class="cart-item-price">₹${cartRecord.item.price} each</p>
            </div>
            <div class="cart-qty-box">
                <button class="cart-qty-btn" onclick="updateItemQuantity(${cartRecord.item.id}, -1)">-</button>
                <span class="cart-qty-num">${cartRecord.quantity}</span>
                <button class="cart-qty-btn" onclick="updateItemQuantity(${cartRecord.item.id}, 1)">+</button>
            </div>
            <div class="cart-item-total">₹${cartRecord.item.price * cartRecord.quantity}</div>
        `;
        list.appendChild(row);
    });

    // Receipt details in drawer
    const itemTotal = appState.cart.reduce((sum, curr) => sum + (curr.item.price * curr.quantity), 0);
    document.getElementById("billItemTotal").textContent = `₹${itemTotal.toFixed(2)}`;

    let deliveryFee = 40.00;
    if (appState.couponApplied && appState.couponApplied.code === "FREEGRAND" && itemTotal >= 400) {
        deliveryFee = 0;
    }
    document.getElementById("billDeliveryFee").textContent = `₹${deliveryFee.toFixed(2)}`;

    const taxes = itemTotal * 0.05;
    document.getElementById("billTaxes").textContent = `₹${taxes.toFixed(2)}`;

    let discount = 0.00;
    if (appState.couponApplied && appState.couponApplied.code === "BITE50") {
        discount = Math.min(itemTotal * 0.5, 100);
    }

    const discountRow = document.getElementById("billDiscountRow");
    if (discount > 0) {
        discountRow.style.display = "flex";
        document.getElementById("billDiscount").textContent = `-₹${discount.toFixed(2)}`;
    } else {
        discountRow.style.display = "none";
    }

    const grand = (itemTotal + deliveryFee + taxes) - discount;
    document.getElementById("billGrandTotal").textContent = `₹${grand.toFixed(2)}`;
}

// Render Checkout Page View details
function renderCheckoutView() {
    const list = document.getElementById("checkoutCartItems");
    if (!list) return;
    list.innerHTML = "";

    if (appState.cart.length === 0) {
        list.innerHTML = `<p style="text-align:center; color:var(--text-secondary);">Your basket is empty.</p>`;
        const btn = document.getElementById("payNowBtn");
        if (btn) {
            btn.disabled = true;
            btn.style.opacity = "0.5";
            btn.style.cursor = "not-allowed";
        }
        updateCheckoutBillTotals(0);
        return;
    }

    const btn = document.getElementById("payNowBtn");
    if (btn) {
        btn.disabled = false;
        btn.style.opacity = "1";
        btn.style.cursor = "pointer";
    }

    appState.cart.forEach(cartRecord => {
        const row = document.createElement("div");
        row.className = "cart-item-row";
        row.style.paddingBottom = "0.5rem";
        row.innerHTML = `
            <div class="cart-item-info">
                <span class="cart-item-name" style="font-size:0.85rem;">${cartRecord.item.name} x ${cartRecord.quantity}</span>
            </div>
            <div class="cart-qty-box" style="height:22px;">
                <button class="cart-qty-btn" style="width:20px;" onclick="updateItemQuantity(${cartRecord.item.id}, -1)">-</button>
                <span class="cart-qty-num" style="padding:0 0.4rem;">${cartRecord.quantity}</span>
                <button class="cart-qty-btn" style="width:20px;" onclick="updateItemQuantity(${cartRecord.item.id}, 1)">+</button>
            </div>
            <div class="cart-item-total" style="font-size:0.85rem;">₹${cartRecord.item.price * cartRecord.quantity}</div>
        `;
        list.appendChild(row);
    });

    renderCheckoutSummaryValues();
}

// Calculate and set receipt values for Checkout
function renderCheckoutSummaryValues() {
    const itemTotal = appState.cart.reduce((sum, curr) => sum + (curr.item.price * curr.quantity), 0);
    updateCheckoutBillTotals(itemTotal);
}

function updateCheckoutBillTotals(itemTotal) {
    const billItem = document.getElementById("checkoutBillItemTotal");
    const billDelivery = document.getElementById("checkoutBillDeliveryFee");
    const billTax = document.getElementById("checkoutBillTaxes");
    const billDiscountRow = document.getElementById("checkoutBillDiscountRow");
    const billDiscount = document.getElementById("checkoutBillDiscount");
    const billGrand = document.getElementById("checkoutBillGrandTotal");

    if (!billItem || !billDelivery || !billTax || !billGrand) return;

    billItem.textContent = `₹${itemTotal.toFixed(2)}`;

    let deliveryFee = 40.00;
    if (appState.couponApplied && appState.couponApplied.code === "FREEGRAND" && itemTotal >= 400) {
        deliveryFee = 0;
    }
    billDelivery.textContent = `₹${deliveryFee.toFixed(2)}`;

    const taxes = itemTotal * 0.05;
    billTax.textContent = `₹${taxes.toFixed(2)}`;

    let discount = 0.00;
    if (appState.couponApplied && appState.couponApplied.code === "BITE50") {
        discount = Math.min(itemTotal * 0.5, 100);
    }

    if (discount > 0 && billDiscountRow && billDiscount) {
        billDiscountRow.style.display = "flex";
        billDiscount.textContent = `-₹${discount.toFixed(2)}`;
    } else if (billDiscountRow) {
        billDiscountRow.style.display = "none";
    }

    const grand = itemTotal === 0 ? 0 : (itemTotal + deliveryFee + taxes) - discount;
    billGrand.textContent = `₹${grand.toFixed(2)}`;
}

// Calculate grand total utility
function calculateGrandTotal() {
    const itemTotal = appState.cart.reduce((sum, curr) => sum + (curr.item.price * curr.quantity), 0);
    let deliveryFee = 40.00;
    if (appState.couponApplied && appState.couponApplied.code === "FREEGRAND" && itemTotal >= 400) {
        deliveryFee = 0;
    }
    const taxes = itemTotal * 0.05;
    let discount = 0.00;
    if (appState.couponApplied && appState.couponApplied.code === "BITE50") {
        discount = Math.min(itemTotal * 0.5, 100);
    }
    return itemTotal === 0 ? 0 : (itemTotal + deliveryFee + taxes) - discount;
}

// Final Order trigger
async function runCheckoutPlaceOrder() {
    if (appState.cart.length === 0) return;

    const payNowBtn = document.getElementById("payNowBtn");
    payNowBtn.textContent = "Processing order...";
    payNowBtn.disabled = true;

    const selectedAddressCard = document.querySelector(".address-card.selected");
    const address = selectedAddressCard ? selectedAddressCard.querySelector("p").textContent : "Home Address";

    const selectedPaymentOpt = document.querySelector(".payment-option.selected input");
    const method = selectedPaymentOpt ? selectedPaymentOpt.value : "upi";

    const payload = {
        items: appState.cart,
        totalAmount: calculateGrandTotal(),
        paymentMethod: method,
        address: address
    };

    try {
        const response = await fetch('/api/order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        
        const result = await response.json();
        
        if (result.success) {
            const activeOrder = {
                orderId: result.orderId,
                courierName: result.courierName,
                eta: result.eta,
                timePlaced: getCurrentTime()
            };
            localStorage.setItem('bitesync-active-order', JSON.stringify(activeOrder));
            
            // Clear cart
            appState.cart = [];
            appState.couponApplied = null;
            syncAndSaveCart();
            clearCouponMessage();

            // Direct to tracking view
            showView('trackingView');
            resumeLiveOrderSimulation();
        } else {
            alert("Order placement failed.");
            payNowBtn.textContent = "Pay & Place Order";
            payNowBtn.disabled = false;
        }
    } catch (err) {
        console.warn("Backend checkout payload failed, starting local fallback simulation.", err.message);
        
        // Offline simulation
        const fallbackHero = ["Rohan Sharma", "Aman Verma", "Rahul Gupta", "Vikram Rathore"][Math.floor(Math.random() * 4)];
        const fallbackOrder = {
            orderId: 'ORD-' + Math.floor(Math.random() * 900000 + 100000),
            courierName: fallbackHero,
            eta: "25 mins",
            timePlaced: getCurrentTime()
        };
        localStorage.setItem('bitesync-active-order', JSON.stringify(fallbackOrder));

        appState.cart = [];
        appState.couponApplied = null;
        syncAndSaveCart();
        clearCouponMessage();

        showView('trackingView');
        resumeLiveOrderSimulation();
    }
}

// Live Order simulation
function resumeLiveOrderSimulation() {
    const activeOrderData = localStorage.getItem('bitesync-active-order');
    if (!activeOrderData) return;
    const order = JSON.parse(activeOrderData);

    const courier = document.getElementById("courierName");
    const eta = document.getElementById("etaTime");
    const bike = document.getElementById("deliveryBike");
    const dismissBtn = document.getElementById("dismissTrackingBtn");

    if (courier) courier.textContent = order.courierName;
    if (eta) eta.textContent = order.eta;
    if (bike) bike.style.left = "20px";

    const steps = [
        document.getElementById("step1"),
        document.getElementById("step2"),
        document.getElementById("step3"),
        document.getElementById("step4")
    ];

    const step1Time = document.getElementById("step1Time");
    const step2Time = document.getElementById("step2Time");
    const step3Time = document.getElementById("step3Time");
    const step4Time = document.getElementById("step4Time");

    steps.forEach(s => {
        if (s) s.classList.remove("active", "completed");
    });

    if (dismissBtn) {
        dismissBtn.disabled = true;
        dismissBtn.textContent = "Awaiting Handover...";
        dismissBtn.classList.remove("enabled");
    }

    // Step 1: Placed
    if (steps[0]) steps[0].classList.add("active");
    if (step1Time) step1Time.textContent = `Order ${order.orderId} received at ${order.timePlaced}`;
    playSystemVoice("Order received successfully! Starting kitchen preparation.");

    // Step 2: Preparing (after 4.5s)
    setTimeout(() => {
        if (steps[0]) {
            steps[0].classList.remove("active");
            steps[0].classList.add("completed");
            const icon = steps[0].querySelector(".step-icon");
            if (icon) icon.innerHTML = "✓";
        }
        if (steps[1]) steps[1].classList.add("active");
        if (step2Time) step2Time.textContent = `Chef started baking fresh ingredients at ${getCurrentTime()}`;
        if (bike) bike.style.left = "30%";
        if (eta) eta.textContent = "18 mins";
        playSystemVoice("The gourmet chef has started baking fresh ingredients in the kitchen.");
    }, 4500);

    // Step 3: Out for delivery (after 9s)
    setTimeout(() => {
        if (steps[1]) {
            steps[1].classList.remove("active");
            steps[1].classList.add("completed");
            const icon = steps[1].querySelector(".step-icon");
            if (icon) icon.innerHTML = "✓";
        }
        if (steps[2]) steps[2].classList.add("active");
        if (step3Time) step3Time.textContent = `${order.courierName} picked up food & zipped off at ${getCurrentTime()}`;
        if (bike) bike.style.left = "65%";
        if (eta) eta.textContent = "8 mins";
        playSystemVoice(`Food picked up! Delivery partner ${order.courierName} is zipping to your location.`);
    }, 9000);

    // Step 4: Delivered (after 13.5s)
    setTimeout(() => {
        if (steps[2]) {
            steps[2].classList.remove("active");
            steps[2].classList.add("completed");
            const icon = steps[2].querySelector(".step-icon");
            if (icon) icon.innerHTML = "✓";
        }
        if (steps[3]) {
            steps[3].classList.add("active");
            steps[3].classList.add("completed");
            const icon = steps[3].querySelector(".step-icon");
            if (icon) icon.innerHTML = "✓";
        }
        if (step4Time) step4Time.textContent = `Delivered to your doorstep at ${getCurrentTime()}`;
        if (bike) bike.style.left = "calc(100% - 60px)";
        if (eta) eta.textContent = "Arrived!";
        playSystemVoice("Ding dong! Your premium BiteSync feast has arrived. Please collect it at the door!");

        if (dismissBtn) {
            dismissBtn.disabled = false;
            dismissBtn.textContent = "Feast Complete! Clear State";
            dismissBtn.classList.add("enabled");
            
            // Set exit listener
            dismissBtn.onclick = () => {
                localStorage.removeItem('bitesync-active-order');
                const payNowBtn = document.getElementById("payNowBtn");
                if (payNowBtn) payNowBtn.textContent = "Pay & Place Order"; // reset checkout button
                showView('homeView');
            };
        }
    }, 13500);
}

// Utility formatting helpers
function formatCurrency(amount) {
    return `₹${amount.toFixed(2)}`;
}

function getCurrentTime() {
    const d = new Date();
    let hours = d.getHours();
    let minutes = d.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + minutes + ' ' + ampm;
}

// Fallback hardcoded lists
function getFallbackData() {
    return [
        {
            id: 1,
            name: "The Grand Biryani Shahi",
            cuisines: ["Biryani", "Mughlai", "North Indian"],
            rating: 4.5,
            time: 30,
            costForTwo: 450,
            discount: "50% OFF up to ₹100",
            isVeg: false,
            image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=60",
            menu: [
                { id: 101, name: "Chicken Dum Biryani", price: 280, isVeg: false, recommended: true, description: "Slow-cooked chicken with spices, basmati rice, and saffron.", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=200&auto=format&fit=crop&q=60" },
                { id: 102, name: "Paneer Tikka Biryani", price: 240, isVeg: true, recommended: true, description: "Fragrant rice cooked with paneer tikka and mint leaves.", image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=200&auto=format&fit=crop&q=60" }
            ]
        },
        {
            id: 2,
            name: "Burger Lounge & Grill",
            cuisines: ["Burgers", "Fast Food", "Snacks"],
            rating: 4.3,
            time: 20,
            costForTwo: 350,
            discount: "40% OFF up to ₹80",
            isVeg: false,
            image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60",
            menu: [
                { id: 201, name: "Crispy Chicken Whopper", price: 180, isVeg: false, recommended: true, description: "Crispy chicken breast patty, fresh lettuce and mayo.", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&auto=format&fit=crop&q=60" }
            ]
        },
        {
            id: 3,
            name: "Pizzeria Deluxe",
            cuisines: ["Pizza", "Italian", "Pastas"],
            rating: 4.6,
            time: 25,
            costForTwo: 500,
            discount: "FREE Delivery above ₹300",
            isVeg: true,
            image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=60",
            menu: [
                { id: 301, name: "Farmhouse Garden Special Pizza", price: 299, isVeg: true, recommended: true, description: "Loaded with capsicums, onions, corn, mushrooms, olives and cheese.", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&auto=format&fit=crop&q=60" }
            ]
        }
    ];
}