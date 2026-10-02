// Menu Data
const categories = [
  { id: 'all', name: 'All Items' },
  { id: 'meals', name: 'Meals & Biryani' },
  { id: 'snacks', name: 'Snacks' },
  { id: 'beverages', name: 'Beverages & Desserts' }
];

const foodItems = [
  {
    id: 1,
    name: 'Special Veg Biryani',
    category: 'meals',
    price: 90,
    diet: 'veg',
    tag: 'Bestseller',
    tagColor: 'bg-amber-500',
    prepTime: '10 mins',
    image: 'images/veg_biriyani.jpg'
  },
  {
    id: 2,
    name: 'Hyderabadi Chicken Biryani',
    category: 'meals',
    price: 140,
    diet: 'non-veg',
    tag: 'Chef Special',
    tagColor: 'bg-orange-500',
    prepTime: '12 mins',
    image: 'images/chicken_biriyani.jpg'
  },
  {
    id: 3,
    name: 'Crispy French Fries',
    category: 'snacks',
    price: 60,
    diet: 'veg',
    tag: 'Hot',
    tagColor: 'bg-red-500',
    prepTime: '6 mins',
    image: 'images/french_fries.jpg'
  },
  {
    id: 4,
    name: 'Mexican Veg Tacos (2 Pcs)',
    category: 'snacks',
    price: 80,
    diet: 'veg',
    tag: 'Popular',
    tagColor: 'bg-blue-500',
    prepTime: '8 mins',
    image: 'images/tacos.jpg'
  },
  {
    id: 5,
    name: 'Royal Rasamalai (2 Pcs)',
    category: 'beverages',
    price: 50,
    diet: 'veg',
    tag: 'Sweet',
    tagColor: 'bg-pink-500',
    prepTime: '3 mins',
    image: 'images/rasamalai.jpg'
  },
  {
    id: 6,
    name: 'Chocolate Ice Cream',
    category: 'beverages',
    price: 40,
    diet: 'veg',
    tag: 'Chilled',
    tagColor: 'bg-cyan-500',
    prepTime: '2 mins',
    image: 'images/ice_cream.jpg'
  },
  {
    id: 7,
    name: 'Crispy Chicken Roll',
    category: 'snacks',
    price: 85,
    diet: 'non-veg',
    tag: 'Spicy',
    tagColor: 'bg-red-600',
    prepTime: '10 mins',
    image: 'images/chicken_roll.jpg'
  },
  {
    id: 8,
    name: 'Cold Coffee with Ice Cream',
    category: 'beverages',
    price: 50,
    diet: 'veg',
    tag: 'Chilled',
    tagColor: 'bg-cyan-500',
    prepTime: '3 mins',
    image: 'images/cold_coffee.jpg'
  },
  {
    id: 9,
    name: 'Soft Idli (3 Pcs with Chutney)',
    category: 'meals',
    price: 35,
    diet: 'veg',
    tag: 'Healthy',
    tagColor: 'bg-emerald-500',
    prepTime: '5 mins',
    image: 'images/idli.jpg'
  },
  {
    id: 10,
    name: 'Crispy Masala Dosa',
    category: 'meals',
    price: 55,
    diet: 'veg',
    tag: 'Bestseller',
    tagColor: 'bg-amber-500',
    prepTime: '7 mins',
    image: 'images/masala_dosa.jpg'
  },
  {
    id: 11,
    name: 'Crispy Samosa (2 Pcs)',
    category: 'snacks',
    price: 30,
    diet: 'veg',
    tag: 'Hot',
    tagColor: 'bg-red-500',
    prepTime: '4 mins',
    image: 'images/samosa.jpg'
  },
  {
    id: 12,
    name: 'Crispy Veg Puff',
    category: 'snacks',
    price: 25,
    diet: 'veg',
    tag: 'Popular',
    tagColor: 'bg-amber-600',
    prepTime: '3 mins',
    image: 'images/Veg_Puff.jpg'
  }
];

let reviews = [
  {
    id: 1,
    name: 'Karthik R. (CSE 3rd Yr)',
    rating: 5,
    comment: 'Pre-ordering saves me 15 minutes of standing in line every day during lunch break!'
  },
  {
    id: 2,
    name: 'Sneha M. (ECE 2nd Yr)',
    rating: 5,
    comment: 'Hot Samosas and Cold Coffee are always fresh and ready right when I arrive at the counter.'
  },
  {
    id: 3,
    name: 'Dr. Anand (Faculty)',
    rating: 4,
    comment: 'Very seamless UPI payment process and hygienic food pickup experience.'
  }
];

let activeCategory = 'all';
let activeDiet = 'all';
let searchQuery = '';
let cart = [];
let selectedRating = 5;

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  // Auth guard — redirect to login if no session
  const user = requireAuth(); // defined in auth.js (loaded before menu.js)
  if (!user) return;          // requireAuth already redirected

  // Show user's name in header
  const greetEl = document.getElementById('userGreeting');
  if (greetEl) greetEl.textContent = `Hi, ${user.name.split(' ')[0]}`;

  renderCategories();
  renderFoodGrid();
  renderReviews();
  updateCartUI();
});

// Render Category Tab Buttons
function renderCategories() {
  const container = document.getElementById('categoryContainer');
  container.innerHTML = categories.map(cat => `
    <button 
      onclick="setCategory('${cat.id}')"
      class="px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all ${
        activeCategory === cat.id 
          ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' 
          : 'bg-white/80 hover:bg-white text-slate-800'
      }"
    >
      ${cat.name}
    </button>
  `).join('');
}

function setCategory(catId) {
  activeCategory = catId;
  renderCategories();
  renderFoodGrid();
}

function setDietFilter(diet) {
  activeDiet = diet;
  document.getElementById('dietAllBtn').className = `px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${diet === 'all' ? 'bg-orange-500 text-white' : 'text-slate-300 hover:text-white'}`;
  document.getElementById('dietVegBtn').className = `px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${diet === 'veg' ? 'bg-emerald-500 text-white' : 'text-slate-300 hover:text-white'}`;
  document.getElementById('dietNonVegBtn').className = `px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${diet === 'non-veg' ? 'bg-red-500 text-white' : 'text-slate-300 hover:text-white'}`;
  renderFoodGrid();
}

function handleSearch() {
  searchQuery = document.getElementById('searchInput').value.toLowerCase();
  renderFoodGrid();
}

// Render Food Cards Grid
function renderFoodGrid() {
  const grid = document.getElementById('foodGrid');
  const filtered = foodItems.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesDiet = activeDiet === 'all' || item.diet === activeDiet;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery);
    return matchesCategory && matchesDiet && matchesSearch;
  });

  document.getElementById('itemCountLabel').textContent = `Showing ${filtered.length} food options`;

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full py-12 text-center bg-slate-900/90 rounded-3xl border border-slate-800">
        <i class="fas fa-search-minus text-4xl text-slate-500 mb-3"></i>
        <h3 class="text-lg font-bold text-white">No food items found</h3>
        <p class="text-xs text-slate-400">Try adjusting your filter or search query</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(item => {
    const cartItem = cart.find(c => c.id === item.id);
    const qty = cartItem ? cartItem.qty : 0;

    return `
      <div class="group rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-orange-500/50 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between">
        <div>
          <div class="relative h-44 overflow-hidden bg-slate-800">
            <img 
              src="${item.image}" 
              alt="${item.name}" 
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=80'"
            />
            <div class="absolute top-3 left-3 flex gap-2">
              <span class="px-2.5 py-1 rounded-full text-[10px] font-black text-white uppercase tracking-wider ${item.diet === 'veg' ? 'bg-emerald-600' : 'bg-red-600'}">
                ${item.diet === 'veg' ? '● Veg' : '● Non-Veg'}
              </span>
              <span class="px-2.5 py-1 rounded-full text-[10px] font-black text-white uppercase tracking-wider ${item.tagColor}">
                ${item.tag}
              </span>
            </div>
            <div class="absolute bottom-3 right-3 bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-xl text-[11px] font-bold text-slate-200">
              <i class="far fa-clock text-orange-400 mr-1"></i>${item.prepTime}
            </div>
          </div>

          <div class="p-5 space-y-2">
            <h3 class="font-black text-white text-base leading-snug group-hover:text-orange-400 transition-colors">${item.name}</h3>
            <div class="flex items-baseline justify-between pt-1">
              <span class="text-xl font-black text-orange-400">₹${item.price}</span>
            </div>
          </div>
        </div>

        <div class="p-5 pt-0">
          ${qty === 0 ? `
            <button 
              onclick="addToCart(${item.id})"
              class="w-full py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2"
            >
              <i class="fas fa-plus"></i> Add to Tray
            </button>
          ` : `
            <div class="flex items-center justify-between bg-slate-800 rounded-xl p-1 border border-slate-700">
              <button onclick="updateQty(${item.id}, -1)" class="w-8 h-8 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-bold flex items-center justify-center">
                <i class="fas fa-minus text-xs"></i>
              </button>
              <span class="font-black text-white text-sm px-3">${qty}</span>
              <button onclick="updateQty(${item.id}, 1)" class="w-8 h-8 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-bold flex items-center justify-center">
                <i class="fas fa-plus text-xs"></i>
              </button>
            </div>
          `}
        </div>
      </div>
    `;
  }).join('');
}

// Cart Management
function addToCart(id) {
  const item = foodItems.find(f => f.id === id);
  const existing = cart.find(c => c.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...item, qty: 1 });
  }
  showToast(`Added ${item.name} to tray`);
  updateCartUI();
  renderFoodGrid();
}

function updateQty(id, delta) {
  const index = cart.findIndex(c => c.id === id);
  if (index !== -1) {
    cart[index].qty += delta;
    if (cart[index].qty <= 0) {
      cart.splice(index, 1);
    }
  }
  updateCartUI();
  renderFoodGrid();
}

function updateCartUI() {
  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  
  document.getElementById('cartBadgeCount').textContent = totalCount;
  document.getElementById('cartSubtotal').textContent = `₹${subtotal}`;
  document.getElementById('cartTotal').textContent = `₹${subtotal}`;

  const listContainer = document.getElementById('cartItemsList');
  if (cart.length === 0) {
    listContainer.innerHTML = `
      <div class="py-16 text-center space-y-3">
        <div class="w-16 h-16 rounded-2xl bg-slate-800 text-slate-500 flex items-center justify-center mx-auto text-2xl">
          <i class="fas fa-shopping-bag"></i>
        </div>
        <p class="text-sm font-bold text-slate-400">Your food tray is empty</p>
      </div>
    `;
  } else {
    listContainer.innerHTML = cart.map(item => `
      <div class="flex items-center justify-between p-3.5 rounded-2xl bg-slate-800 border border-slate-700">
        <div class="space-y-1 pr-2">
          <h4 class="text-xs font-black text-white leading-tight">${item.name}</h4>
          <span class="text-xs font-bold text-orange-400">₹${item.price} x ${item.qty} = ₹${item.price * item.qty}</span>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="updateQty(${item.id}, -1)" class="w-7 h-7 rounded-lg bg-slate-700 text-white font-bold flex items-center justify-center text-xs">
            <i class="fas fa-minus"></i>
          </button>
          <span class="font-black text-white text-xs">${item.qty}</span>
          <button onclick="updateQty(${item.id}, 1)" class="w-7 h-7 rounded-lg bg-orange-500 text-white font-bold flex items-center justify-center text-xs">
            <i class="fas fa-plus"></i>
          </button>
        </div>
      </div>
    `).join('');
  }
}

function toggleCartModal() {
  const modal = document.getElementById('cartModal');
  const backdrop = document.getElementById('cartBackdrop');
  const panel = document.getElementById('cartPanel');

  if (modal.classList.contains('invisible')) {
    modal.classList.remove('invisible');
    setTimeout(() => {
      backdrop.classList.add('opacity-100');
      panel.classList.remove('translate-x-full');
    }, 10);
  } else {
    backdrop.classList.remove('opacity-100');
    panel.classList.add('translate-x-full');
    setTimeout(() => {
      modal.classList.add('invisible');
    }, 300);
  }
}

function proceedToPayment() {
  if (cart.length === 0) {
    showToast('Add items to your tray before proceeding!', 'error');
    return;
  }
  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  document.getElementById('paymentModalTotal').textContent = `₹${total}`;
  toggleCartModal();
  document.getElementById('paymentModal').classList.remove('hidden');
  document.getElementById('paymentModal').classList.add('flex');
}

function closePaymentModal() {
  document.getElementById('paymentModal').classList.add('hidden');
  document.getElementById('paymentModal').classList.remove('flex');
}

function confirmOrderPayment() {
  if (cart.length === 0) {
    showToast('Your cart is empty!', 'error');
    return;
  }

  const user = JSON.parse(localStorage.getItem('canteen_session') || 'null');

  if (!user || !user.userId) {
    showToast('Please login before placing an order.', 'error');
    window.location.href = 'login.html';
    return;
  }

  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  // Build order object
  const order = {
    orderId:     Date.now(),
    userId:      user.userId,
    userName:    user.name,
    totalAmount: total,
    status:      'PENDING',
    pickupTime:  document.getElementById('pickupTimeSelect')
                   ? document.getElementById('pickupTimeSelect').value
                   : 'Immediate',
    createdAt:   new Date().toISOString(),
    items: cart.map(item => ({
      itemId:   item.id,
      name:     item.name,
      quantity: item.qty,
      price:    item.price
    }))
  };

  // Save to localStorage orders list
  const orders = JSON.parse(localStorage.getItem('canteen_orders') || '[]');
  orders.push(order);
  localStorage.setItem('canteen_orders', JSON.stringify(orders));

  // Generate token number (last 4 digits of orderId)
  const token = String(order.orderId).slice(-4);

  closePaymentModal();

  confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });

  cart = [];
  updateCartUI();
  renderFoodGrid();

  showToast(`🎉 Order Placed! Token #${token} — Show at Counter 2`);
}


// Copy to Clipboard Helper
function copyToClipboard(text, label) {
  navigator.clipboard.writeText(text);
  showToast(`Copied ${label} to clipboard!`);
}

// Support Modal Handlers
function openSupportModal() {
  document.getElementById('supportModal').classList.remove('hidden');
  document.getElementById('supportModal').classList.add('flex');
}
function closeSupportModal() {
  document.getElementById('supportModal').classList.add('hidden');
  document.getElementById('supportModal').classList.remove('flex');
}
function submitSupportForm(e) {
  e.preventDefault();
  closeSupportModal();
  showToast('Inquiry submitted successfully!');
}

// Reviews Handlers
function renderReviews() {
  const grid = document.getElementById('reviewsGrid');
  grid.innerHTML = reviews.map(rev => `
    <div class="p-5 rounded-2xl bg-slate-800 border border-slate-700 flex flex-col justify-between space-y-3">
      <div class="space-y-2">
        <div class="flex text-amber-400 text-xs">
          ${Array(rev.rating).fill('<i class="fas fa-star"></i>').join('')}
        </div>
        <p class="text-xs text-slate-300 font-medium italic">"${rev.comment}"</p>
      </div>
      <span class="text-xs font-black text-slate-400 block">— ${rev.name}</span>
    </div>
  `).join('');
}

function openReviewModal() {
  document.getElementById('reviewModal').classList.remove('hidden');
  document.getElementById('reviewModal').classList.add('flex');
}
function closeReviewModal() {
  document.getElementById('reviewModal').classList.add('hidden');
  document.getElementById('reviewModal').classList.remove('flex');
}
function setReviewRating(rating) {
  selectedRating = rating;
  const stars = document.querySelectorAll('#starRatingInput button');
  stars.forEach((btn, index) => {
    btn.className = index < rating ? 'text-amber-400 transition-colors' : 'text-slate-600 hover:text-amber-400 transition-colors';
  });
}
function submitReview(e) {
  e.preventDefault();
  const name = document.getElementById('reviewerName').value;
  const comment = document.getElementById('reviewerComment').value;
  
  reviews.unshift({
    id: Date.now(),
    name: name,
    rating: selectedRating,
    comment: comment
  });

  renderReviews();
  closeReviewModal();
  confetti({ particleCount: 50, spread: 50 });
  showToast('Thank you for your review!');
}

// Toast Notification System
function showToast(msg, type = 'success') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `p-4 rounded-2xl text-xs font-black text-white shadow-2xl flex items-center gap-2 pointer-events-auto transition-all transform ${type === 'error' ? 'bg-red-600' : 'bg-slate-900 border border-slate-700'}`;
  toast.innerHTML = `
    <i class="${type === 'error' ? 'fas fa-exclamation-circle text-red-400' : 'fas fa-check-circle text-emerald-400'}"></i>
    <span>${msg}</span>
  `;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}