export const filterCategoriesBasedOnSearch = (categories, searchText) =>
  categories.filter((category) =>Object.values(category.name).some(name=> name.toLowerCase().includes(searchText.toLowerCase())));

  export const filterCategoriesBasedOnStatus = (categories, state) =>{
    if(state===""){
      return categories;
    }
    return categories.filter((category) =>category.status===state)
  }
