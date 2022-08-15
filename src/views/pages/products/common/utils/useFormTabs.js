import React from "react";
import LanguageBasedForm from "../forms/LanguageBasedForm";
import DetailsForm from "../forms/DetailsForm";
import { MdLanguage } from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";
import { useTranslation } from "utility/language";


const useFormTabs = (editMode = false) => {
  const t = useTranslation();

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
            <BsInfoCircle size={20} /> {t("item_details")}
          </>
        ),
        content: <DetailsForm editMode={editMode} />,
      },
      // {
      //   title: (
      //     <>
      //       <DescriptionIcon size={20} /> {t("product_description")}
      //     </>
      //   ),
      //   content: <ProductDescriptionForm  />,
      // },
    ];
    // if (!editMode) {
    //   tabs.push({
    //     title: (
    //       <>
    //         <BsImages size={20} /> {t("additional_images")}
    //       </>
    //     ),
    //     content: (
    //       <AdditionalImagesForm
    //         editMode={editMode}
    //         images={images}
    //         setImages={setImages}
    //       />
    //     ),
    //   });
    // }
    // if(editMode){
    //   tabs.push(   {
    //     title: (
    //       <>
    //         <CommentIcon size={20} /> {t("comments")}
    //       </>
    //     ),
    //     content: <Comments
    //       commentQuery={commentQuery}
    //       commentMuation={commentMuation}
     

    //     />,
    //   },
    //   {
    //     title: (
    //       <>
    //         <ReviewsIcon size={20} /> {t("reviews")}
    //       </>
    //     ),
    //     content: <Reviews
    //     reviewsMutation={reviewsMutation}
    //       reviewsQuery={reviewsQuery}

    //     />,
    //   },)
    // }
    return tabs;
  }, [t, editMode]);
};

export default useFormTabs;
