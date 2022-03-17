import React from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";

interface SwatchCircleInput {
  buttonClickRef: React.MutableRefObject<any>;
  setImagePreview: React.Dispatch<any>;
}

const AddImageButton = ({
  buttonClickRef,
  setImagePreview,
}: SwatchCircleInput) => {
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImagePreview(imageList[0]);
  };
  return (
    <ImageUploading value={images} onChange={onChange} maxNumber={maxNumber}>
      {({
        imageList,
        onImageUpload,
        onImageRemoveAll,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps,
      }) => (
        // write your building UI
        <div className="upload__image-wrapper">
          <button
            style={isDragging ? { color: "red" } : undefined}
            onClick={onImageUpload}
            {...dragProps}
            ref={buttonClickRef}
            className="image_upload_button"
          >
            Click or Drop here
          </button>
        </div>
      )}
    </ImageUploading>
  );
};

export default AddImageButton;
