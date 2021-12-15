import React, { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import s from "./Modal.module.css";

const modalRoot = document.querySelector("#modal-root");

const Modal = ({ onToggleMenu, modalImage }) => {
  const hendleKeyDownEsc = useCallback(
    (e) => {
      if (e.code === "Escape") {
        onToggleMenu();
      }
    },
    [onToggleMenu]
  );

  useEffect(() => {
    window.addEventListener("keydown", hendleKeyDownEsc);
    return function clean() {
      window.removeEventListener("keydown", hendleKeyDownEsc);
    };
  }, [hendleKeyDownEsc]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onToggleMenu();
    }
  };

  return createPortal(
    <div className={s.Overlay} onClick={handleBackdropClick}>
      <div className={s.Modal}>
        <img className={s.image} src={modalImage} alt="LargePhoto" />
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
