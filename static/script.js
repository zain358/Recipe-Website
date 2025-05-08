// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Fetch and display recipes
async function loadRecipes(query = '') {
    try {
        const response = await fetch(`/api/recipes${query ? `?search=${encodeURIComponent(query)}` : ''}`);
        const recipes = await response.json();
        const recipeGrid = document.getElementById('recipeGrid');
        recipeGrid.innerHTML = '';

        recipes.forEach(recipe => {
            const card = document.createElement('div');
            card.className = 'recipe-card';
            card.innerHTML = `
                <img src="${recipe.image}" alt="${recipe.title}">
                <h3>${recipe.title}</h3>
                <p>${recipe.description}</p>
                <a href="#" class="view-recipe" data-id="${recipe.id}">View Recipe</a>
            `;
            recipeGrid.appendChild(card);
        });

        // Add click event for recipe details
        document.querySelectorAll('.view-recipe').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const recipeId = e.target.getAttribute('data-id');
                alert(`Recipe ID ${recipeId} details coming soon!`);
            });
        });
    } catch (error) {
        console.error('Error loading recipes:', error);
    }
}

// Search functionality
document.getElementById('searchInput').addEventListener('input', (e) => {
    const query = e.target.value.trim();
    loadRecipes(query);
});

// Category filter
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
        const category = card.getAttribute('data-category');
        loadRecipes(category);
    });
});

// Newsletter form submission
document.getElementById('newsletterForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input').value;
    alert(`Thank you for subscribing with ${email}!`);
    e.target.reset();
});

// Load recipes on page load
document.addEventListener('DOMContentLoaded', () => loadRecipes());