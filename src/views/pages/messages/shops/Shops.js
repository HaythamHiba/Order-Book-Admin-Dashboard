import { SearchInput } from 'components/input'
import React from 'react'
import { useTranslation } from 'utility/language';
import { filterShopsBasedOnSearch } from './filter';
import OneShop from './OneShop'
import classes from './Style.module.scss'
export default function Shops({data,ClickedShop}) {
    const t=useTranslation();
    const [search,setSearchText]=React.useState("");
  const [filteredData, setFilteredData] = React.useState([]);
  React.useEffect(() => {
    if (Array.isArray(data)) {
      if (search) {
        setFilteredData(
          filterShopsBasedOnSearch(data, search)
        );
      } else {
        setFilteredData(data);
      }
    }
  }, [search, data]);
    
  return (
    <>

    <div className={classes.UpperContainer}>


    <SearchInput onChange={setSearchText} placeholder={t("_search.shop")}/>
    <div className={classes.ShopsContainer}>
    {
       filteredData.map(shop=> <OneShop key={shop.id} shop={shop} clicked={ClickedShop}/>) 
    }
    </div>
    </div>
    </>
  )
}
