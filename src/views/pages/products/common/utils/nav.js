import { TYPE } from "../useProductType";
import { history } from "../../../../../history";

export const navigateToAllProducts = (productType) => {
  if (productType === TYPE.OWNER_PRODUCT) {
    history.push(`/owner-products/view-all`);
  }
  if (productType === TYPE.SHOP_PRODUCT) {
    history.goBack();
  }
};
