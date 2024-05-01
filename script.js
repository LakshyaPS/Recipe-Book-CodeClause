document.addEventListener('DOMContentLoaded', function () {
  const recipeContainer = document.getElementById('recipe-container');
  const recipeModal = document.getElementById('recipeModal');
  const recipeModalTitle = document.getElementById('recipeModalTitle');
  const recipeModalImage = document.getElementById('recipeModalImage');
  const recipeModalIngredients = document.getElementById('recipeModalIngredients');
  const editRecipeBtn = document.getElementById('editRecipeBtn');
  const addRecipeBtn = document.getElementById('add-recipe-btn');
  const addRecipeModal = document.getElementById('addRecipeModal');
  const addRecipeForm = document.getElementById('addRecipeForm');
  const recipeNameInput = document.getElementById('recipeName');
  const recipeIngredientsInput = document.getElementById('recipeIngredients');
  const recipeImageInput = document.getElementById('recipeImage');

  // Sample recipe data (replace with your actual data)
  const recipes = [
    { 
      title: 'Spaghetti Carbonara',  
      image: 'https://via.placeholder.com/400x200',
      ingredients: ['Spaghetti', 'Bacon', 'Eggs', 'Parmesan cheese', 'Black pepper'] 
    },
    { 
      title: 'Chicken Alfredo', 
      image: 'https://via.placeholder.com/400x200',
      ingredients: ['Chicken', 'Fettuccine pasta', 'Heavy cream', 'Parmesan cheese', 'Garlic'] 
    }
  ]; 

  // Function to render recipes
  function renderRecipes() {
    recipeContainer.innerHTML = '';
    recipes.forEach((recipe, index) => {
      const recipeCard = createRecipeCard(recipe, index);
      recipeContainer.appendChild(recipeCard);
    });
  }

  // Function to create recipe card
  function createRecipeCard(recipe, index) {
    const recipeCard = document.createElement('div');
    recipeCard.classList.add('col-md-6', 'mb-4');
    recipeCard.innerHTML = `
      <div class="recipe card" data-index="${index}">
        <img src="${recipe.image}" class="card-img-top" alt="Recipe Image">
        <div class="card-body">
          <h5 class="card-title">${recipe.title}</h5>
        </div>
      </div>
    `;
    return recipeCard;
  }

  // Function to show recipe details modal
  function showRecipeModal(index) {
    const recipe = recipes[index];
    recipeModalTitle.textContent = recipe.title;
    recipeModalImage.src = recipe.image;
    recipeModalIngredients.innerHTML = '';
    recipe.ingredients.forEach(ingredient => {
      const li = document.createElement('li');
      li.textContent = ingredient;
      recipeModalIngredients.appendChild(li);
    });
    recipeModal.classList.add('show');
    recipeModal.style.display = 'block';
  }

  // Event listener to open recipe details modal when recipe card is clicked
  recipeContainer.addEventListener('click', function (event) {
    const recipeCard = event.target.closest('.recipe');
    if (recipeCard) {
      const index = parseInt(recipeCard.getAttribute('data-index'));
      showRecipeModal(index);
    }
  });

  // Event listener to close recipe details modal when close button is clicked
  recipeModal.addEventListener('click', function (event) {
    if (event.target.classList.contains('close') || !event.target.closest('.modal-content')) {
      recipeModal.classList.remove('show');
      recipeModal.style.display = 'none';
    }
  });

  // Event listener for Edit Recipe button
  editRecipeBtn.addEventListener('click', function () {
    // Add your code to handle editing recipe here
    // This is just a placeholder
    alert('Edit Recipe clicked!');
  });

  // Event listener to open add recipe modal when add recipe button is clicked
  addRecipeBtn.addEventListener('click', function () {
    addRecipeModal.classList.add('show');
    addRecipeModal.style.display = 'block';
  });

  // Event listener for submitting add recipe form
  addRecipeForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const name = recipeNameInput.value.trim();
    const ingredients = recipeIngredientsInput.value.trim().split('\n');
    const image = URL.createObjectURL(recipeImageInput.files[0]);

    if (name && ingredients.length > 0 && image) {
      const newRecipe = { title: name, image: image, ingredients: ingredients };
      recipes.push(newRecipe);
      const newRecipeCard = createRecipeCard(newRecipe, recipes.length - 1);
      recipeContainer.appendChild(newRecipeCard);
      addRecipeModal.classList.remove('show');
      addRecipeModal.style.display = 'none';
      addRecipeForm.reset();
    } else {
      alert('Please fill in all fields.');
    }
  });

  // Render initial recipes
  renderRecipes();
});
 