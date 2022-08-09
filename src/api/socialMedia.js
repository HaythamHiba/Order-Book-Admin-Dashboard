import { useAddMutation, useDeleteMutation, useUpdateMutation, useToggleStatus, useGetQuery } from "./helpers";

const API = {
    ADD: `/api/admin/social_media/add`,
    GET_SINGLE_GALLERY_ITEM: `/api/admin/social_media`,
    GET_ALL: `/api/admin/all_social_media`,
    UPDATE_STATUS: `/api/admin/social_media/update_social_media_status`,
    UPDATE_DETAILS: `/api/admin/social_media/update`,
    DELETE: `/api/admin/social_media/delete`,
}
const KEY = 'SOCIAL_MEDIA'
export const useAddSocialMedia = () => useAddMutation(KEY, API.ADD);
export const useGetSocialMedia = () => useGetQuery(KEY, API.GET_ALL);
export const useUpdateSocialMedia = () => useUpdateMutation(KEY, API.UPDATE_DETAILS);
export const useUpdateSocialMediaStatus = () => useToggleStatus(KEY, API.UPDATE_STATUS, 'social_media_id');
export const useDeleteSocialMedia = () => useDeleteMutation(KEY, API.DELETE, 'social_media_id', 'social_media');