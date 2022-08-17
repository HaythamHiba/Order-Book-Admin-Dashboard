export const filterOffersBasedOnSearch = (offers, searchText) =>
  offers.filter((offer) =>Object.values(offer.name).some(name=> name.toLowerCase().includes(searchText.toLowerCase())));

  export const filterOffersBasedOnStatus = (offers, state) =>{
    if(state===""){
      return offers;
    }
    return offers.filter((offer) =>offer.status===state)
  }
