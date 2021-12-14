import s from "./Button.module.css";
import React from "react";

const Button = ({ onClick }) => {
  return (
    <button onClick={() => onClick()} className={s.Button} type="button">
      Load More
    </button>
  );
};

export default Button;
