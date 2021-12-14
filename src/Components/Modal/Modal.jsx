import React, { Component } from "react";
import { createPortal } from "react-dom";
import s from "./Modal.module.css";

const modalRoot = document.querySelector("#modal-root");

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.hendleKeyDownEsc);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.hendleKeyDownEsc);
  }

  hendleKeyDownEsc = (e) => {
    if (e.code === "Escape") {
      this.props.onToggleMenu();
    }
  };

  handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      this.props.onToggleMenu();
    }
  };

  render() {
    return createPortal(
      <div className={s.Overlay} onClick={this.handleBackdropClick}>
        <div className={s.Modal}>
          <img
            className={s.image}
            src={this.props.modalImage}
            alt="LargePhoto"
          />
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
// <div className={s.Overlay}>
//   <div className={s.Modal}>
//     <img src="" alt="" />
//   </div>
// </div>
