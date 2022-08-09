import React from "react";
import LanguageBasedForm from "../forms/LanguageBasedForm";
import DetailsForm from "../forms/DetailsForm";
import AdditionalImagesForm from "../forms/AdditionalImagesForm";
import { MdLanguage } from "react-icons/md";
import { BsInfoCircle, BsImages } from "react-icons/bs";
import { useTranslation } from "utility/language";
import ProductDescriptionForm from "../forms/ProductDescriptionForm";
import DescriptionIcon from '@mui/icons-material/Description';
import Comments from "../comments/Comments";
import Reviews from "../reviews/Reviews";
import CommentIcon from '@mui/icons-material/Comment';
import ReviewsIcon from '@mui/icons-material/Reviews';
const useFormTabs = (editMode = false, commentQuery
  , reviewsQuery,
  commentMuation,
  reviewsMutation) => {
  const t = useTranslation();
  const [images, setImages] = React.useState([]);

  return React.useMemo(() => {
    const tabs = [
      {
        title: (
          <>
            <MdLanguage size={20} /> {t("basic_info")}
          </>
        ),
        content: <LanguageBasedForm editMode={editMode} />,
      },
      {
        title: (
          <>
            <BsInfoCircle size={20} /> {t("product_details")}
          </>
        ),
        content: <DetailsForm editMode={editMode} />,
      },
      {
        title: (
          <>
            <DescriptionIcon size={20} /> {t("product_description")}
          </>
        ),
        content: <ProductDescriptionForm />,
      },



    ];
    if (!editMode) {
      tabs.push({
        title: (
          <>
            <BsImages size={20} /> {t("additional_images")}
          </>
        ),
        content: (
          <AdditionalImagesForm
            editMode={editMode}
            images={images}
            setImages={setImages}
          />
        ),
      });
    }
    if (editMode) {
      tabs.push({
        title: (
          <>
            <CommentIcon size={20} /> {t("comments")}
          </>
        ),
        content: <Comments
          commentQuery={commentQuery}
          commentMuation={commentMuation}


        />,
      },
        {
          title: (
            <>
              <ReviewsIcon size={20} /> {t("reviews")}
            </>
          ),
          content: <Reviews
            reviewsMutation={reviewsMutation}
            reviewsQuery={reviewsQuery}

          />,
        })
    }
    return tabs;
  }, [t, editMode, images,commentQuery,commentMuation,reviewsMutation,reviewsQuery]);
};

export default useFormTabs;
