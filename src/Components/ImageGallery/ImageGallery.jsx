import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import s from "./ImageGallery.module.css";
import React from "react";

const ImageGallery = ({ arrayQueryList, onToggleMenu, modalImageLoad }) => {
  console.log(arrayQueryList);
  return (
    <ul className={s.ImageGallery}>
      {arrayQueryList.map((list, index) => (
        <ImageGalleryItem
          key={list.id + index}
          nameList={list}
          onToggleMenu={onToggleMenu}
          modalImageLoad={modalImageLoad}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;
