import s from "./Searchbar.module.css";
import React, { Component } from "react";
import { toast } from "react-toastify";

export class Searchbar extends Component {
  state = {
    queryName: "",
  };

  handleChange = (e) => {
    this.setState({ queryName: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.queryName.trim() === "") {
      toast.warn(`Введите запрос`);
    } else {
      this.props.onSubmit(this.state.queryName);

      this.reset();
    }
  };

  reset() {
    this.setState({ queryName: "" });
  }

  render() {
    return (
      <header className={s.searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.SearchFormbutton}>
            <span className={s.SearchFormbuttonlabel}>Search</span>
          </button>

          <input
            onChange={this.handleChange}
            value={this.state.queryName}
            className={s.SearchForminput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
