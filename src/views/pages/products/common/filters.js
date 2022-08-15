export const filterItemsBasedOnSearch = (items, searchText) =>
items.filter((item) =>Object.values(item.name).some(name=> name.toLowerCase().includes(searchText.toLowerCase())));