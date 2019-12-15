import { elements } from './base';

export const getInput = () => elements.searchField.value;

export const clearInput = () => elements.searchField.value = '';

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
};

//limit of title length of recipes that displays in left tab 
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

            

};

const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
`;

const renderButtons = (page, numResults, resPerPage) => {
    //calculating number of pages for displaying
    const pages = Math.ceil(numResults / resPerPage);

    let button;

    //generating results page controls based on quantity of recipes

    if(page === 1 && pages > 1) {
       //if it's the first page of many
       button = createButton(page, 'next');
    } else if (page < pages){
        //if it's some page in a massive of pages
        button = `
        ${button = createButton(page, 'next')}
        ${button = createButton(page, 'prev')}
        `;
    } else if (page === pages && pages > 1){
        //for last page of all
        button = createButton(page, 'prev');
    }
    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
}

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    //start and end points for slice method
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;
    //click on 'prev' or 'next' buttons will change start&end points
    recipes.slice(start, end).forEach(renderRecipe);

    renderButtons(page, recipes.length, resPerPage);
}