let selectedIngredients = [];
let selectedTime = "";
let selectedDish = "";
let selectedHealth = "";
let categories = {
  vegetables: ["onion","tomato","potato","carrot","beans","cabbage","spinach"],
  fruits: ["apple","banana","mango","orange","grapes","kiwi","pineapple","papaya"],
  dairy: ["milk","butter","cheese","curd","paneer"],
  spices: ["salt","pepper","turmeric","chilli","cumin"],
  staples: ["rice","flour","wheat","oats","bread"],
  sweets: ["sugar","honey","chocolate","jaggery"]
};

const smartCategories = {
  fruits: ["kiwi","mango","apple","banana","orange","grapes","pineapple","papaya","watermelon"],
  vegetables: ["carrot","beans","cabbage","spinach","broccoli","onion","potato","peas"],
  dairy: ["milk","cheese","butter","curd","paneer"],
  spices: ["salt","pepper","chilli","turmeric","cumin","garam masala"],
  sweets: ["sugar","honey","chocolate","jaggery"],
  staples: ["rice","wheat","flour","oats","bread"]
};

function saveIngredients(){
    localStorage.setItem("selectedIngredients", JSON.stringify(selectedIngredients));
}

function renderCategories(){
  for(let category in categories){
    let box=document.getElementById(category);
    box.innerHTML="";

    categories[category].forEach(item=>{
      let chip=document.createElement("span");
      chip.className="chip";

      if(selectedIngredients.includes(item)){
        chip.classList.add("selected-chip");
      }

      chip.innerText=item;
      chip.onclick=()=>toggleIngredient(item);

      box.appendChild(chip);
    });
  }
}

function toggleIngredient(item){
  if(selectedIngredients.includes(item)){
    selectedIngredients = selectedIngredients.filter(i=>i!==item);
  } else {
    selectedIngredients.push(item);
  }

  saveIngredients();   // ⭐ SAVE EVERY TIME
  displaySelected();
  renderCategories();
}

function addIngredient(){
  let input=document.getElementById("ingredientInput");
  let item=input.value.toLowerCase().trim();
  if(!item) return;

  let found=false;

  for(let category in smartCategories){
    if(smartCategories[category].includes(item)){
      if(!categories[category].includes(item)){
        categories[category].push(item);
      }
      found=true;
      break;
    }
  }

  if(!found){
    categories.staples.push(item);
  }

  toggleIngredient(item);
  input.value="";
}

function displaySelected(){
  let box=document.getElementById("selectedIngredients");
  box.innerHTML="";

  selectedIngredients.forEach(item=>{
    let chip=document.createElement("span");
    chip.className="chip selected-chip";
    chip.innerText=item;

    let remove=document.createElement("span");
    remove.innerText="✖";
    remove.className="remove-chip";
    remove.onclick=(e)=>{
      e.stopPropagation();
      toggleIngredient(item);
    };

    chip.appendChild(remove);
    box.appendChild(chip);
  });
}

function selectTime(btn,time){
  if(selectedTime===time){
    selectedTime="";
    btn.classList.remove("selected-btn");
  } else {
    selectedTime=time;
    document.querySelectorAll(".time-btn").forEach(b=>b.classList.remove("selected-btn"));
    btn.classList.add("selected-btn");
  }
}

function selectDish(btn,dish){
  if(selectedDish===dish){
    selectedDish="";
    btn.classList.remove("selected-btn");
  } else {
    selectedDish=dish;
    document.querySelectorAll(".dish-btn").forEach(b=>b.classList.remove("selected-btn"));
    btn.classList.add("selected-btn");
  }
}

// ⭐ DIRECTLY GO TO PAGE 2 (NO PREVIEW)
// ... (keep your existing categories and toggle functions)

function goToRecipes() {
    // Force save all current states to localStorage
    localStorage.setItem("selectedIngredients", JSON.stringify(selectedIngredients));
    localStorage.setItem("selectedTime", selectedTime);
    localStorage.setItem("selectedDish", selectedDish);
    localStorage.setItem("selectedHealth", selectedHealth);

    // Redirect to the recipe page
    window.location.href = "receipe.html"; 
}

// Ensure your "Show What I Can Cook" button in index.html calls this.
function selectHealth(btn, health){

  if(selectedHealth === health){
    selectedHealth = "";
    btn.classList.remove("selected-btn");
    return;
  }

  selectedHealth = health;
  document.querySelectorAll(".health-btn").forEach(b=>b.classList.remove("selected-btn"));
  btn.classList.add("selected-btn");
}
renderCategories();