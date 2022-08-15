export const filterVendorsBasedOnSearch = (vendors, searchText) =>
vendors.filter((vendor) =>Object.values(vendor.name).some(name=> name.toLowerCase().includes(searchText.toLowerCase())));
