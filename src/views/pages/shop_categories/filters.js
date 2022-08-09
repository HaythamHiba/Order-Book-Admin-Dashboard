export const filterCategoriesBasedOnSearch = (categories, searchText) =>
  categories.filter((category) =>
    category.shop_category_details.some(({ shop_category_name }) =>
    shop_category_name.toLowerCase().includes(searchText.toLowerCase())
    )
  );
