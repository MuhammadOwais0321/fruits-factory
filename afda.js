// ================== GLOBAL CART ARRAY ==================
let cartItems = []; // { id, name, price, src, quantity, domElement }

// ================== CART BUTTON FUNCTION (Fixed) ==================
function cartBtn(id) {
  cartCircle.classList.remove("hidden");
  if (!cartCircle.classList.contains("mainActive")) {
    cartCircle.classList.add("mainActive");
  }

  // Find product from generatedArray
  let obj = generatedArray.find(item => item.id === id);
  if (!obj) return;

  // Check if already in cart
  let existingItem = cartItems.find(item => item.id === id);

  if (existingItem) {
    // Already in cart -> increase quantity, update DOM
    existingItem.quantity++;
    updateCartItemDOM(existingItem);
  } else {
    // Not in cart -> create new card, quantity = 1
    let newItem = {
      id: obj.id,
      name: obj.name,
      price: obj.price,
      src: obj.src,
      quantity: 1
    };

    // Create card (same as you had)
    let div = document.createElement('div');
    div.className = "flex items-center gap-4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/60 hover:shadow-xl transition-shadow duration-300";
    div.setAttribute('data-id', obj.id); // to find it later
    div.innerHTML = `
      <div class="w-14 h-14 rounded-xl overflow-hidden shadow-sm shrink-0">
        <img src="${obj.src}" alt="${obj.name}" class="w-full h-full object-cover" />
      </div>
      <div class="flex-1 min-w-0">
        <h3 class="font-extrabold text-[#2d5a3f] text-base truncate">${obj.name}</h3>
        <p class="text-xs text-stone-500 font-medium">${obj.price} Rs each</p>
      </div>
      <div class="flex items-center gap-1">
        <button onclick="changeQuantity(${obj.id}, -1)" class="w-7 h-7 bg-[#eef6ed] text-[#2d5a3f] rounded-full flex items-center justify-center font-bold hover:bg-[#d4e8d2] active:scale-95 transition-all text-sm">−</button>
        <span class="quantity-span text-sm font-bold min-w-7 text-center text-[#2d5a3f]">1</span>
        <button onclick="changeQuantity(${obj.id}, 1)" class="w-7 h-7 bg-[#eef6ed] text-[#2d5a3f] rounded-full flex items-center justify-center font-bold hover:bg-[#d4e8d2] active:scale-95 transition-all text-sm">+</button>
      </div>
      <div class="flex items-center gap-2 shrink-0">
        <span class="total-price font-extrabold text-[#2d5a3f] text-base">${obj.price.toFixed(2)} Rs</span>
        <button onclick="removeCartItem(${obj.id})" class="w-8 h-8 bg-red-50 hover:bg-red-100 text-red-400 hover:text-red-600 rounded-full flex items-center justify-center transition-colors" title="Remove">
          <i class="fa-solid fa-trash-can text-xs"></i>
        </button>
      </div>
    `;

    newItem.domElement = div; // save reference
    cartItems.push(newItem);
    cartItemsContainer.appendChild(div);
    cartEmptyState.classList.add('page-hidden');
  }

  updateCartBadge();
}

// ================== UPDATE CART ITEM DOM ==================
function updateCartItemDOM(item) {
  let div = item.domElement;
  if (!div) return;
  // Update quantity span
  let qtySpan = div.querySelector('.quantity-span');
  if (qtySpan) qtySpan.textContent = item.quantity;
  // Update total price
  let priceSpan = div.querySelector('.total-price');
  if (priceSpan) priceSpan.textContent = (item.price * item.quantity).toFixed(2) + ' Rs';
}

// ================== CHANGE QUANTITY (+/-) ==================
function changeQuantity(id, delta) {
  let item = cartItems.find(item => item.id === id);
  if (!item) return;

  item.quantity += delta;

  if (item.quantity <= 0) {
    // Remove item if quantity becomes 0
    removeCartItem(id);
  } else {
    updateCartItemDOM(item);
  }
  updateCartBadge();
}

// ================== REMOVE CART ITEM ==================
function removeCartItem(id) {
  let item = cartItems.find(item => item.id === id);
  if (!item) return;

  if (item.domElement) {
    cartItemsContainer.removeChild(item.domElement);
  }
  cartItems = cartItems.filter(item => item.id !== id);
  
  // Show empty state if cart empty
  if (cartItems.length === 0) {
    cartEmptyState.classList.remove('page-hidden');
  }
  updateCartBadge();
}

// ================== UPDATE CART BADGE ==================
function updateCartBadge() {
  let total = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  if (total === 0) {
    cartCircle.classList.add('hidden');
  } else {
    cartCircle.classList.remove('hidden');
    cartCircle.textContent = total;
  }
}