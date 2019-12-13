import { elements } from './base';

export const getInput = () => elements.searchField.value;

export const clearInput = () => elements.searchField.value = '';

export const clearResults = () => elements.searchResList.innerHTML = '';

const limitRecipeTitle = (title, limit = 18) => {
    let newTitle = [];
    if(title.length > limit) {
       newTitle = title.split(' ', 4);
       return `${newTitle.join(' ')}...`
    }

    return title;
}

export const renderLoader = parent => {
    const loader = `
    <div class="loader">
        <svg>
            <use href="img/icons.svg#icon-cw"></use>
        </svg>
    </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
};

export const removeLoader = () => {
    const loader = document.querySelector('.loader');
    if(loader){
        loader.parentElement.removeChild(loader);
    }
    
}

const renderRecipe = recipe => {
   
    //html markup of recipes
    const markup = `
                <li>
                    <a class="results__link" href="#${recipe.recipe_id}">
                        <figure class="results__fig">
                            <img src="${recipe.image_url}" alt="Test">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                            <p class="results__author">${recipe.publisher}</p>
                        </div>
                    </a>
                </li>
            `;

    elements.searchResList.insertAdjacentHTML('beforeend', markup);

            

}

export const renderResults = recipes => {
    recipes.forEach(renderRecipe);
}