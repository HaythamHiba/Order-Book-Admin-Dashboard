import {
  useGetQuery,
  useToggleStatus,
  useDeleteMutation,
  useUploadWithProgress,
  useUpdateMutation
} from "./helpers";

const API = {
  ADD: `/api/admin/shop_product/add`,
  GET_SINGLE_PRODUCT: `/api/admin/shop_product`,
  GET_ALL: `/api/admin/shop_products?shop_id=1`,
  UPDATE_STATUS: `/api/admin/shop_product/update_status`,
  UPDATE_DETAILS: `/api/admin/shop_product/update`,
  UPDATE_IMAGES: `/api/admin/shop_product/update_images`,
  DELETE: `/api/admin/shop_product/delete`,
  GET_SHOP_PRODUCT_COMMENTS: `/api/admin/shop_product/comments`,
  UPDATE_SHOP_PRODUCT_COMMENTS: `/api/admin/shop_product/update_comment_status`,
  GET_SHOP_PRODUCT_REVIEWS: `/api/admin/shop_product/reviews`,
  UPDATE_SHOP_PRODUCT_REVIEWS: `/api/admin/shop_product/update_reviews_status`,
};

const KEY = "SHOPS_PRODUCTS";
export const useGetProducts = (shop_id) =>
  useGetQuery(KEY, API.GET_ALL, { shop_id }, { enabled: !!shop_id });
export const useAddProduct = () => useUploadWithProgress(KEY, API.ADD);
export const useUpdateProductStatus = () =>
  useToggleStatus(KEY, API.UPDATE_STATUS, "product_id", "shops_products");
export const useDeleteProduct = () =>
  useDeleteMutation(KEY, API.DELETE, "product_id", "shops_products");

const SINGLE_PRODUCT_KEY = "SINGLE_SHOPS_PRODUCT";
export const useGetSingleProduct = (product_id, shop_id) =>
  useGetQuery(
    SINGLE_PRODUCT_KEY,
    API.GET_SINGLE_PRODUCT,
    {
      product_id,
      shop_id
    },
    { enabled: !!product_id }
  );
export const useUpdateDetailsMutation = () =>
  useUploadWithProgress(SINGLE_PRODUCT_KEY, API.UPDATE_DETAILS);
export const useUpdateImages = () =>
  useUploadWithProgress(SINGLE_PRODUCT_KEY, API.UPDATE_IMAGES);
  export const useGetShopProductComments = (params) => useGetQuery("SHOP_PRODUCT_COMMENTS", API.GET_SHOP_PRODUCT_COMMENTS, { ...params });
  export const useUpdateShopProductCommentStatus = () => useToggleStatus("SHOP_PRODUCT_COMMENTS", API.UPDATE_SHOP_PRODUCT_COMMENTS, "comment_id", "shop_product_comments")
  export const useGetShopProductReviews = (params) => useGetQuery("SHOP_PRODUCT_REVIEWS", API.GET_SHOP_PRODUCT_REVIEWS, { ...params });
  export const useUpdateShopProductReviewsStatus = () => useUpdateMutation("SHOP_PRODUCT_REVIEWS", API.UPDATE_SHOP_PRODUCT_REVIEWS)