

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





const fruits = [
  { name: "Apple", price: 2.5 },
  { name: "Banana", price: 1.2 },
  { name: "Orange", price: 3.0 },
  { name: "Mango", price: 4.5 },
  { name: "Grapes", price: 2.8 },
  { name: "Strawberry", price: 5.0 }
];

const totalObjects = 1000
const generatedArray = []

for (let id = 1; id <= totalObjects; id++){
    
    const fruitIndex = (id -1)% fruits.length
    const fruit = fruits[fruitIndex]
    const imageNumber =( Math.floor((id - 1) / fruits.length ) % 8)+1
    const fruitNameLower = fruit.name.toLowerCase()
    const obj = {
        id: id,
        name: fruit.name,
        price: fruit.price,
        src: `/assets/${fruitNameLower} ${imageNumber}.jpg`
    }
    generatedArray.push(obj)
    
}








frontFormBtn.addEventListener("click", (e) => {
  e.preventDefault();
  mainDiv.classList.add("mainActive");
  mainDiv.classList.remove("hidden");
  frontForm.classList.add("hidden");
  frontDiv.classList.add("hidden");
  let email = frontFormEmail.value;
  emailPara.innerHTML = `your Email is : ${email}`;
  frontFormEmail.value = "";
  let name = frontFormName.value;
  namePara.innerText = `your Name is : ${name}`;
  frontFormName.value = "";
});


generatedArray.forEach( (obj)=> {
  let div =  document.createElement('div')
  div.className = 'w-52 rounded-2xl h-80 bg-white  flex overflow-hidden flex-col justify-start items-center'
//   div.className.add('w-52 rounded-2xl h-80 bg-white  flex overflow-hidden flex-col justify-start items-center')
  div.setAttribute("id",`${obj.id}` );
  div.innerHTML = ` <img class="h-[50%]" src="${obj.src}" alt="" />
          <div class="flex h-[50%] justify-between items-center gap-5">
            <div class="w-1/2">
              <h1>${obj.name}</h1>
              <h1>${obj.price} Rs</h1>
            </div>
                    <div onclick="cartBtn()"
          class="h-12 w-12 flex flex-col justify-center items-center bg-[#3e4838] text-2xl text-[#bedaa5] hover:text-[#87c38f]">
            <button  class="text-[10px] flex flex-col ">cart
            
        
          </button>
           <i class="fa-solid fa-cart-shopping"></i>
           </div>
          </div>
           `
           bodyDiv.appendChild(div)
    
});



searchBtn.addEventListener('click', ()=>{
    let searchTerm = SearchBar.value.toLowerCase()
  let filteredArray =   generatedArray.filter((obj)=> obj.name.toLowerCase().includes(searchTerm))
//   console.log(filteredArray);
if (filteredArray.length === 0) {
    bodyDiv.innerHTML = `<h1 class="text-black text-3xl">${SearchBar.value} is not found...<h1/>`
    return
}
  
  bodyDiv.innerHTML = ''

  filteredArray.forEach( (obj)=> {
  let div =  document.createElement('div')
  div.className = 'w-52 rounded-2xl h-80 bg-white  flex overflow-hidden flex-col justify-start items-center'
//   div.className.add('w-52 rounded-2xl h-80 bg-white  flex overflow-hidden flex-col justify-start items-center')
  div.setAttribute("id",`${obj.id}` );
  div.innerHTML = ` <img class="h-[50%]" src="${obj.src}" alt="" />
          <div class="flex h-[50%] justify-between items-center gap-5">
            <div class="w-1/2">
              <h1>${obj.name}</h1>
              <h1>${obj.price} Rs</h1>
            </div>
                    <div  onclick="cartBtn()"
          class="h-12 w-12 flex flex-col justify-center items-center bg-[#3e4838] text-2xl text-[#bedaa5] hover:text-[#87c38f]">
            <button class="text-[10px] flex flex-col ">cart
            
        
          </button>
           <i class="fa-solid fa-cart-shopping"></i>
           </div>
          </div>
           `
           bodyDiv.appendChild(div)
    
});
    
})
 let a = 1
function cartBtn(){
    console.log('owis');
    if (!cartCircle.classList.contains('mainActive')) {
        cartCircle.classList.add('mainActive')
    }
   
    cartCircle.innerHTML = `${a}`
    a++

   
}


