const foodForm = document.getElementById("foodForm");
const foodNameInput = document.getElementById("foodName");
const caloriesInput = document.getElementById("calories");
const foodList = document.getElementById("foodList");
const totalCaloriesEl = document.getElementById("totalCalories");
const resetBtn = document.getElementById("resetBtn");
const message = document.getElementById("message");
const progressBar = document.getElementById("progressBar");

const DAILY_GOAL = 2000;

let foods = JSON.parse(localStorage.getItem("foods")) || [];

/**
 * Saves food data to localStorage.
 */
function saveFoods() {
  localStorage.setItem("foods", JSON.stringify(foods));
}

/**
 /**
 * Fetches calorie data from Open Food Facts API.
 */
async function fetchCalorieData(foodName, manualCalories) {
  try {
    const response = await fetch(
      `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${foodName}&search_simple=1&action=process&json=1`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch food data");
    }

    const data = await response.json();

    let calories = Number(manualCalories);

    if (data.products.length > 0) {
      const firstFood = data.products[0];

      if (firstFood.nutriments && firstFood.nutriments["energy-kcal_100g"]) {
        calories = Math.round(firstFood.nutriments["energy-kcal_100g"]);
      }
    }

    return {
      id: Date.now(),
      name: foodName,
      calories: calories,
    };
  } catch (error) {
    showMessage("Could not get food data. Manual calories used.", "error");

    return {
      id: Date.now(),
      name: foodName,
      calories: Number(manualCalories),
    };
  }
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

  foods.forEach((food) => {
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
  const calories = caloriesInput.value;

  if (foodName === "" || calories <= 0) {
    showMessage("Please enter valid food details.", "error");
    return;
  }

  const newFood = await fetchCalorieData(foodName, calories);

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

displayFoods();