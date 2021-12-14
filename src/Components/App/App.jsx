import React, { Component } from "react";
import Searchbar from "../Searchbar/Searchbar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import Loader from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const URL = "https://pixabay.com/api/";
const API_KEY = "24465879-ee592e630361e28095acfb740";

export class App extends Component {
  state = {
    arrayList: [],
    queryName: "",
    page: 1,
    loading: false,
    showModal: false,
    largeImg: "",
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.queryName !== this.state.queryName ||
      prevState.page !== this.state.page
    ) {
      this.setState({ loading: true });
      this.fetchPick()
        .then((newArray) => {
          if (newArray.total === 0) {
            toast.warn(`Ничего не найдено`);
          } else {
            this.setState((prevState) => ({
              arrayList: [...prevState.arrayList, ...newArray.hits],
            }));
          }
        })
        .catch((error) => toast.error("Oops, something went wrong"))
        .finally(() => this.setState({ loading: false }));
    }
    if (prevState.arrayList !== this.state.arrayList && this.state.page !== 1) {
      window.scrollTo({ top: document.body.clientHeight, behavior: "smooth" });
    }
  }

  getLargeImageForModal = (data) => {
    this.toggleModal();
    this.setState({ largeImg: data });
  };

  fetchPick = () => {
    return fetch(
      `${URL}?q=${this.state.queryName}&key=${API_KEY}&image_type=photo&orientation=horizontal&page=${this.state.page}&per_page=12`
    ).then((res) => {
      if (res.status === 404) {
        return Promise.reject("Oops, something went wrong");
      }
      return res.json();
    });
  };

  toggleModal = () => {
    this.setState((state) => ({
      showModal: !state.showModal,
    }));
  };

  handleFormSubmit = (data) => {
    this.setState({ queryName: data, arrayList: [], page: 1 });
  };

  handleClikLoadMore = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }));
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {this.state.loading && (
          <Loader type="ThreeDots" color="#00BFFF" height={100} width={100} />
        )}
        {this.state.arrayList.length !== 0 && (
          <ImageGallery
            modalImageLoad={this.getLargeImageForModal}
            arrayQueryList={this.state.arrayList}
            onToggleMenu={this.toggleModal}
          />
        )}

        {this.state.arrayList.length !== 0 && (
          <Button onClick={this.handleClikLoadMore} />
        )}
        {this.state.showModal && (
          <Modal
            onToggleMenu={this.toggleModal}
            modalImage={this.state.largeImg}
          />
        )}
        <ToastContainer />
      </div>
    );
  }
}

export default App;
