import Search from './models/Search';
import * as searchView from './views/searchView'
import { elements } from './views/base'

//Global state of the app
//search object
//current recipe object
//shopping list objects
//liked recipes

const state = {};

const controlSearch = async () => {
    //1 get query from view
    const query = searchView.getInput();

    if(query){
        //2 new search object and add to state
        state.search = new Search(query);

        //3 prepare UI for results
          //clearing search field
        searchView.clearInput();
          //clearing results tab
          searchView.clearResults();
          searchView.renderLoader(elements.searchRes);

        //4 search
        await state.search.getResult();

        //display search results
        searchView.removeLoader();
        searchView.renderResults(state.search.result);
        
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})


