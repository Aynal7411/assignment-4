const mealContainer = document.getElementById("mealContainer");
const loader = document.getElementById("page-loader");

/* ================= PAGE LOAD ================= */
window.addEventListener("load", () => {
  fetchMeals("");
});

/* ================= SEARCH ================= */
function searchMeal() {
  const foodName = document.getElementById("searchInput").value;
  fetchMeals(foodName);
}

/* ================= FETCH MEALS ================= */
function fetchMeals(query) {
  loader.style.display = "flex"; // SHOW loader

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    .then(res => res.json())
    .then(data => {
      mealContainer.innerHTML = "";

      if (!data.meals) {
        mealContainer.innerHTML = "<p>No recipes found</p>";
        return;
      }

      data.meals.forEach(meal => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
          <div class="card-body">
            <h3>${meal.strMeal}</h3>
            <p>${meal.strInstructions.slice(0, 80)}...</p>
            <button onclick="viewDetails('${meal.idMeal}')">
              View Details
            </button>
          </div>
        `;

        mealContainer.appendChild(card);
      });
    })
    .catch(() => {
      mealContainer.innerHTML = "<p>Something went wrong</p>";
    })
    .finally(() => {
      loader.style.display = "none"; // HIDE loader ✅
    });
}

/* ================= DETAILS ================= */
function viewDetails(id) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(res => res.json())
    .then(data => {
      const meal = data.meals[0];
      alert(meal.strMeal + "\n\n" + meal.strInstructions);
    });
}
