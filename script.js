const foodForm = document.getElementById("foodForm");
const foodNameInput = document.getElementById("foodName");
const caloriesInput = document.getElementById("calories");
const foodList = document.getElementById("foodList");
const totalCaloriesEl = document.getElementById("totalCalories");
const resetBtn = document.getElementById("resetBtn");
const message = document.getElementById("message");
const progressBar = document.getElementById("progressBar");
const searchInput = document.getElementById("searchInput");
const filterSelect = document.getElementById("filterSelect");

const DAILY_GOAL = 2000;

let foods = JSON.parse(localStorage.getItem("foods")) || [];

/**
 * Saves food data to localStorage.
 */
function saveFoods() {
  localStorage.setItem("foods", JSON.stringify(foods));
}


 /**
 * Fetches calorie data from Open Food Facts API.
 */
async function fetchCalorieData(foodName) {
  try {
    const searchName = encodeURIComponent(foodName);

    const response = await fetch(
      `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${searchName}&search_simple=1&action=process&json=1`
    );

    if (!response.ok) {
      throw new Error("API request failed");
    }

    const data = await response.json();

    if (!data.products || data.products.length === 0) {
      showMessage("Food not found. Try a more specific name.", "error");
      return null;
    }

    const foodWithCalories = data.products.find((product) => {
      return product.nutriments && product.nutriments["energy-kcal_100g"];
    });

    if (!foodWithCalories) {
      showMessage("No calorie data found for this food.", "error");
      return null;
    }

    return {
      id: Date.now(),
      name: foodWithCalories.product_name || foodName,
      calories: Math.round(foodWithCalories.nutriments["energy-kcal_100g"]),
    };
  } catch (error) {
    console.error(error);
    showMessage("Cannot fetch data from API. Check internet or try again.", "error");
    return null;
  }
  console.log(response.status);
}

/**
 * Displays messages to the user.
 */
function showMessage(text, type) {
  message.textContent = text;

  if (type === "success") {
    message.className = "text-center mt-3 text-sm text-emerald-600";
  } else {
    message.className = "text-center mt-3 text-sm text-red-500";
  }

  setTimeout(() => {
    message.textContent = "";
  }, 2500);
}

/**
 * Displays all food items on the page.
 */
function displayFoods() {
  foodList.innerHTML = "";

  const searchTerm = searchInput.value.toLowerCase();
  const filterValue = filterSelect.value;

  let filteredFoods = foods.filter((food) => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm);

    let matchesFilter = true;

    if (filterValue === "low") {
      matchesFilter = food.calories < 200;
    } else if (filterValue === "medium") {
      matchesFilter = food.calories >= 200 && food.calories <= 500;
    } else if (filterValue === "high") {
      matchesFilter = food.calories > 500;
    }

    return matchesSearch && matchesFilter;
  });

  if (filteredFoods.length === 0) {
    foodList.innerHTML = `
      <li class="text-center text-gray-500 bg-slate-100 p-3 rounded-lg">
        No food items found.
      </li>
    `;
  }

  filteredFoods.forEach((food) => {
    const li = document.createElement("li");

    li.className =
      "flex justify-between items-center bg-slate-100 p-3 rounded-lg";

    li.innerHTML = `
      <div>
        <p class="font-semibold">${food.name}</p>
        <p class="text-sm text-gray-500">${food.calories} calories</p>
      </div>

      <div class="flex gap-2">
        <button onclick="editFood(${food.id})" class="text-blue-600 font-semibold">
          Edit
        </button>

        <button onclick="removeFood(${food.id})" class="text-red-600 font-semibold">
          Remove
        </button>
      </div>
    `;

    foodList.appendChild(li);
  });

  updateTotalCalories();
}

/**
 * Calculates and updates total calories.
 */
function updateTotalCalories() {
  const total = foods.reduce((sum, food) => sum + food.calories, 0);

  totalCaloriesEl.textContent = total;

  const progress = Math.min((total / DAILY_GOAL) * 100, 100);
  progressBar.style.width = `${progress}%`;
}

/**
 * Adds a new food item.
 */
async function addFood(event) {
  event.preventDefault();

  const foodName = foodNameInput.value.trim();

  if (foodName === "") {
    showMessage("Please enter a food name.", "error");
    return;
  }

  const newFood = await fetchCalorieData(foodName);

  if (newFood) {
    foods.push(newFood);
    saveFoods();
    displayFoods();

    foodForm.reset();
    showMessage("Food added successfully!", "success");
  }
}

/**
 * Removes a food item.
 */
function removeFood(id) {
  foods = foods.filter((food) => food.id !== id);

  saveFoods();
  displayFoods();

  showMessage("Food removed.", "success");
}

/**
 * Edits a food item.
 */
function editFood(id) {
  const food = foods.find((item) => item.id === id);

  const newName = prompt("Edit food name:", food.name);
  const newCalories = prompt("Edit calories:", food.calories);

  if (newName && newCalories > 0) {
    food.name = newName;
    food.calories = Number(newCalories);

    saveFoods();
    displayFoods();

    showMessage("Food updated successfully!", "success");
  }
}

/**
 * Resets the whole day.
 */
function resetDay() {
  foods = [];

  saveFoods();
  displayFoods();

  showMessage("Calorie count reset.", "success");
}

foodForm.addEventListener("submit", addFood);
resetBtn.addEventListener("click", resetDay);
searchInput.addEventListener("input", displayFoods);
filterSelect.addEventListener("change", displayFoods);

displayFoods();