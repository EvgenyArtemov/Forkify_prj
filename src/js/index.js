import Search from './models/Search';
import Recipe from './models/recipe';
import * as searchView from './views/searchView'
import { elements } from './views/base'

//Global state of the app
//search object
//current recipe object
//shopping list objects
//liked recipes

////////////////////////
/* Search controller */
//////////////////////

const state = {};

const controlSearch = async () => {
    //1 get query from view
    const query = searchView.getInput();
    // const query = 'pasta';

    if(query){
        //2 new search object and add to state
        state.search = new Search(query);

        //3 prepare UI for results
          //clearing search field
        searchView.clearInput();
          //clearing results tab
          searchView.clearResults();
          searchView.renderLoader(elements.searchRes);

          try{
            //4 search
            await state.search.getResult();
    
            //display search results
            searchView.removeLoader(); //removing animation after loading
    
            searchView.renderResults(state.search.result);
            //console.log(state.search.result);

          } catch (err){
            alert('Something went wrong!');
            searchView.removeLoader();
          }

        
    }
}

elements.searchForm.addEventListener('submit', e => {
    //prevent reloading of the page
    e.preventDefault();
   
    controlSearch();
});

///////////////test

// window.addEventListener('load', e => {
//   //prevent reloading of the page
//   e.preventDefault();
 
//   controlSearch();
// });

elements.searchResPages.addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline');
  if(btn){
    //this variable keeps value from data-goto attribute of button
    //dataset could be any name you want (dataset.random_name), the only purpose is to save certain value, as variable inside CSS
    const goToPage = parseInt(btn.dataset.goto, 10);
    //clear recipes from previous page
    searchView.clearResults();
    //this time we paste into function 'page' parameter differ from default '1'(goToPage)
    searchView.renderResults(state.search.result, goToPage);
  }
})

////////////////////////
/* Recipe controller */
//////////////////////
const controlRecipe = async () => {

  const id = window.location.hash.replace('#', '');

  if(id){
    //prepare UI for changes
    //create new recipe object
    state.recipe = new Recipe(id);

    
    try{
      //get recipe data
      await state.recipe.getRecipe();

      state.recipe.parseIngredients();
      //calculate servings and time
      state.recipe.cookTime();
      state.recipe.calcServings();
      //render recipe

    } catch (err){
      console.log(err);
      alert('Something went wrong!')
    }

  }
}

window.addEventListener('hashchange', controlRecipe);

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

