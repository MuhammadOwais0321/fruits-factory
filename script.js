console.log("js is working");
const frontDiv = document.getElementById("frontDiv");
const frontForm = document.getElementById("frontForm");
const frontFormEmail = frontForm[0];
const frontFormName = frontForm[1];
const frontFormBtn = frontForm[2];
const mainDiv = document.getElementById("mainDiv");
const emailPara = document.getElementById("emailPara");
const namePara = document.getElementById("namePara");
const bodyDiv = document.getElementById("bodyDiv");
const searchBtn = document.getElementById("searchBtn");
const SearchBar = document.getElementById("SearchBar");
const cartCircle = document.getElementById("cartCircle");
const cartIconTrigger = document.getElementById("cartIconTrigger");
const cartPage = document.getElementById("cartPage");
const cartItemsContainer = document.getElementById("cartItemsContainer");
const cartEmptyState = document.getElementById("cartEmptyState");
const cartTotalPrice = document.getElementById("cartTotalPrice");
const backToShopFromCart = document.getElementById("backToShopFromCart");
const proceedToCheckout = document.getElementById("proceedToCheckout");
const checkoutPage = document.getElementById("checkoutPage");
const backToCartFromCheckout = document.getElementById("backToCartFromCheckout",);
const placeOrder = document.getElementById("placeOrder");
const confirmationPage = document.getElementById("confirmationPage");
const backToShopFinal = document.getElementById("backToShopFinal");
const emptyCartAlert = document.getElementById("emptyCartAlert");
const closeEmptyCartAlert = document.getElementById("closeEmptyCartAlert");
const alertContinueShopping = document.getElementById("alertContinueShopping");

const fruits = [
  { name: "Apple", price: 2.5 },
  { name: "Banana", price: 1.2 },
  { name: "Orange", price: 3.0 },
  { name: "Mango", price: 4.5 },
  { name: "Grapes", price: 2.8 },
  { name: "Strawberry", price: 5.0 },
];

const totalObjects = 1000;
const generatedArray = [];

for (let id = 1; id <= totalObjects; id++) {
  const fruitIndex = (id - 1) % fruits.length;
  const fruit = fruits[fruitIndex];
  const imageNumber = (Math.floor((id - 1) / fruits.length) % 8) + 1;
  const fruitNameLower = fruit.name.toLowerCase();
  const obj = {
    id: id,
    name: fruit.name,
    price: fruit.price,
    src: `/assets/${fruitNameLower} ${imageNumber}.jpg`,
  };
  generatedArray.push(obj);
}

frontFormBtn.addEventListener("click", (e) => {
  e.preventDefault();
  mainDiv.classList.add("mainActive");
  mainDiv.classList.remove("page-hidden");
  frontForm.classList.remove("flex");
  frontForm.classList.add("page-hidden");
  frontDiv.classList.remove("flex");
  frontDiv.classList.add("page-hidden");
  let email = frontFormEmail.value;
  emailPara.innerHTML = `your Email is : ${email}`;
  frontFormEmail.value = "";
  let name = frontFormName.value;
  namePara.innerText = `your Name is : ${name}`;
  frontFormName.value = "";
});

generatedArray.forEach((obj) => {
  let div = document.createElement("div");
  div.className =
    "w-52 rounded-2xl h-80 bg-white  flex overflow-hidden flex-col justify-start items-center";
  div.setAttribute("id", `${obj.id}`);
  div.innerHTML = ` <img class="h-[50%]" src="${obj.src}" alt="" />
          <div class="flex h-[50%] justify-between items-center gap-5">
            <div class="w-1/2">
              <h1>${obj.name}</h1>
              <h1>${obj.price} $</h1>
            </div>
                    <div onclick=" cartBtn(${obj.id})"
          class="h-12 w-12 flex flex-col justify-center items-center bg-[#3e4838] text-2xl text-[#bedaa5] hover:text-[#87c38f]">
            <button   class="text-[10px] flex flex-col ">cart
            
        
          </button>
           <i class="fa-solid fa-cart-shopping"></i>
           </div>
          </div>
           `;
  bodyDiv.appendChild(div);
});

searchBtn.addEventListener("click", () => {
  let searchTerm = SearchBar.value.toLowerCase();
  let filteredArray = generatedArray.filter((obj) =>
    obj.name.toLowerCase().includes(searchTerm),
  );
  //   console.log(filteredArray);
  if (filteredArray.length === 0) {
    bodyDiv.innerHTML = `<h1 class="text-black text-3xl">${SearchBar.value} is not found...</h1>`;
    return;
  }

  bodyDiv.innerHTML = "";

  filteredArray.forEach((obj) => {
  let div = document.createElement("div");
  div.className =
    "w-52 rounded-2xl h-80 bg-white  flex overflow-hidden flex-col justify-start items-center";
  div.setAttribute("id", `${obj.id}`);
  div.innerHTML = ` <img class="h-[50%]" src="${obj.src}" alt="" />
          <div class="flex h-[50%] justify-between items-center gap-5">
            <div class="w-1/2">
              <h1>${obj.name}</h1>
              <h1>${obj.price} $</h1>
            </div>
                    <div onclick=" cartBtn(${obj.id})"
          class="h-12 w-12 flex flex-col justify-center items-center bg-[#3e4838] text-2xl text-[#bedaa5] hover:text-[#87c38f]">
            <button   class="text-[10px] flex flex-col ">cart
            
        
          </button>
           <i class="fa-solid fa-cart-shopping"></i>
           </div>
          </div>
           `;
  bodyDiv.appendChild(div);
});
});
cartIconTrigger.addEventListener("click", () => {
  mainDiv.classList.add("page-hidden");
  cartPage.classList.remove("page-hidden");
});

let cartItems = [];

function cartBtn(id) {
  
  let existingItem = cartItems.find((items)=> items.id == id)
  if (existingItem) {
    existingItem.quantity ++
    updateCartItemDom(existingItem)
    
  }else{
 let obj = generatedArray.find((item)=>item.id == id)
if(!obj)return
  
  
let newItem = {
  id: obj.id,
  name: obj.name,
  price: obj.price,
  src: obj.src,
  quantity: 1
}
  let div = document.createElement("div");
    div.className =
      "flex items-center gap-4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/60 hover:shadow-xl transition-shadow duration-300";
    div.setAttribute("data-id", obj.id);

    div.innerHTML = ` <!-- Product image -->
      <div class="w-14 h-14 rounded-xl overflow-hidden shadow-sm shrink-0">
        <img src="${obj.src}" alt="${obj.name}" class="w-full h-full object-cover" />
      </div>

      <!-- Name & unit price -->
      <div class="flex-1 min-w-0">
        <h3 class="font-extrabold text-[#2d5a3f] text-base truncate">${obj.name}</h3>
        <p class="text-xs text-stone-500 font-medium">${obj.price} Rs each</p>
      </div>

      <!-- Quantity controls -->
      <div class="flex items-center gap-1">
        <button onclick="changeQuantity(${obj.id}, -1)" class="w-7 h-7 bg-[#eef6ed] text-[#2d5a3f] rounded-full flex items-center justify-center font-bold hover:bg-[#d4e8d2] active:scale-95 transition-all text-sm">-</button>
        <span class="quantity-span text-sm font-bold min-w-7 text-center text-[#2d5a3f]">1</span>
        <button onclick="changeQuantity(${obj.id}, 1)"  class="w-7 h-7 bg-[#eef6ed] text-[#2d5a3f] rounded-full flex items-center justify-center font-bold hover:bg-[#d4e8d2] active:scale-95 transition-all text-sm">+</button>
      </div>

      <!-- Total price + dustbin (nicely aligned horizontally) -->
      <div class="flex items-center gap-2 shrink-0">
        <span class="total-price font-extrabold text-[#2d5a3f] text-base">${obj.price.toFixed(2)} $</span>
        <button onclick="removeCartItem(${obj.id})" class="w-8 h-8 bg-red-50 hover:bg-red-100 text-red-400 hover:text-red-600 rounded-full flex items-center justify-center transition-colors" title="Remove">
          <i class="fa-solid fa-trash-can text-xs"></i>
        </button>
      </div>`;
      newItem.domElement = div
      cartItems.push(newItem)
      cartItemsContainer.appendChild(div)
      cartEmptyState.classList.add('page-hidden')

  }
   updateCartBedge()
   updateCartTotalPrice()
}
function updateCartItemDom(item){
let div = item.domElement
if(!div)return
let qtyspan = div.querySelector('.quantity-span')
if(qtyspan) qtyspan.textContent = item.quantity
let priceSpan = div.querySelector('.total-price')
if(priceSpan) priceSpan.textContent = (item.quantity * item.price).toFixed(2) + '$'

}
function changeQuantity (id , delta){
let item = cartItems.find((item)=> item.id == id)
if(!item)return

item.quantity += delta
if(item.quantity <= 0){
  removeCartItem(id)
}else{
  updateCartItemDom(item)
}
 updateCartBedge()
 updateCartTotalPrice()
}
function removeCartItem (id){
  let item = cartItems.find((item)=> item.id == id)
  if(!item)return
  let div = item.domElement
  if(div){
    cartItemsContainer.removeChild(div)
  }
  cartItems = cartItems.filter((item)=> item.id !== id)

  if(cartItems.length == 0){
    cartEmptyState.classList.remove('page-hidden')

  }else{
    cartEmptyState.classList.add('page-hidden')
  }
   updateCartBedge()
   updateCartTotalPrice()
}
function updateCartBedge(){
  let total = cartItems.reduce((sum, item)=>sum +  item.quantity ,0)
  if(total == 0){
    cartCircle.classList.add('page-hidden')
  }else{
    cartCircle.classList.remove('page-hidden')
    cartCircle.textContent = total
  }
}
function updateCartTotalPrice(){
  let total = cartItems.reduce((sum , item)=>sum +(item.quantity * item.price), 0)
  cartTotalPrice.textContent = total.toFixed(2) + '$'
}



backToShopFromCart.addEventListener("click", () => {
  cartPage.classList.add("page-hidden");
  mainDiv.classList.remove("page-hidden");
});

proceedToCheckout.addEventListener("click", () => {
  if (cartItems.length == 0) {
    cartPage.classList.add("page-hidden");
    emptyCartAlert.classList.remove("page-hidden");
  } else {
    cartPage.classList.add("page-hidden");
    checkoutPage.classList.remove("page-hidden");
  }
});
backToCartFromCheckout.addEventListener("click", () => {
  checkoutPage.classList.add("page-hidden");
  cartPage.classList.remove("page-hidden");
});
placeOrder.addEventListener("click", (e) => {
  e.preventDefault();
  checkoutPage.classList.add('page-hidden')
  confirmationPage.classList.remove('page-hidden')
cartItems.forEach((item)=>{
  cartItemsContainer.removeChild(item.domElement)
})
cartItems =[]
updateCartTotalPrice()
updateCartBedge()
cartEmptyState.classList.remove('page-hidden')
});

backToShopFinal.addEventListener("click", () => {
  mainDiv.classList.remove("page-hidden");
  confirmationPage.classList.add("page-hidden");
});
function continueShoping() {
  emptyCartAlert.classList.add("page-hidden");
  mainDiv.classList.remove("page-hidden");
}
closeEmptyCartAlert.addEventListener("click", continueShoping);
alertContinueShopping.addEventListener("click", continueShoping);
