import s from "./ImageGalleryItem.module.css";
import React from "react";

const ImageGalleryItem = ({ nameList, onToggleMenu, modalImageLoad }) => {
  return (
    <li className={s.ImageGalleryItem}>
      <img
        onClick={() => modalImageLoad(nameList.largeImageURL)}
        className={s.ImageGalleryItemimage}
        src={nameList.webformatURL}
        alt={nameList.type}
      />
    </li>
  );
};

export default ImageGalleryItem;
