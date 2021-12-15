import s from "./Searchbar.module.css";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Searchbar = ({ onSubmit }) => {
  const [queryName, setQueryName] = useState("");

  const handleChange = (e) => {
    setQueryName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (queryName.trim() === "") {
      toast.warn(`Введите запрос`);
    } else {
      onSubmit(queryName);

      reset();
    }
  };

  const reset = () => {
    setQueryName("");
  };

  return (
    <header className={s.searchbar}>
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s.SearchFormbutton}>
          <span className={s.SearchFormbuttonlabel}>Search</span>
        </button>

        <input
          onChange={handleChange}
          value={queryName}
          className={s.SearchForminput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
export default Searchbar;
