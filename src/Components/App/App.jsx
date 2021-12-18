import React, { useState, useEffect } from "react";
import Searchbar from "../Searchbar/Searchbar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import Loader from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const URL = "https://pixabay.com/api/";
const API_KEY = "24465879-ee592e630361e28095acfb740";

const App = () => {
  const [arrayList, setArrayList] = useState([]);
  const [queryName, setQueryName] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImg, setLargeImg] = useState("");

  useEffect(() => {
    if (queryName === "") {
      return;
    }
    setLoading(true);
    fetchPick()
      .then((newArray) => {
        if (newArray.total === 0) {
          toast.warn(`Ничего не найдено`);
        } else {
          setArrayList([...arrayList, ...newArray.hits]);
        }
      })
      .catch((error) => toast.error("Oops, something went wrong"))
      .finally(() => {
        setLoading(false);
        if (page !== 1) {
          window.scrollTo({
            top: document.body.clientHeight,
            behavior: "smooth",
          });
        }
      });
  }, [queryName, page]);
  const getLargeImageForModal = (data) => {
    toggleModal();
    setLargeImg(data);
  };

  const fetchPick = async () => {
    const res = await fetch(
      `${URL}?q=${queryName}&key=${API_KEY}&image_type=photo&orientation=horizontal&page=${page}&per_page=12`
    );
    if (res.status === 404) {
      return Promise.reject("Oops, something went wrong");
    }
    return await res.json();
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleFormSubmit = (data) => {
    setQueryName(data);
    setArrayList([]);
    setPage(1);
  };

  const handleClikLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <div>
      <Searchbar onSubmit={handleFormSubmit} />
      {loading && (
        <Loader type="ThreeDots" color="#00BFFF" height={100} width={100} />
      )}
      {arrayList.length !== 0 && (
        <ImageGallery
          modalImageLoad={getLargeImageForModal}
          arrayQueryList={arrayList}
          onToggleMenu={toggleModal}
        />
      )}

      {arrayList.length !== 0 && <Button onClick={handleClikLoadMore} />}
      {showModal && <Modal onToggleMenu={toggleModal} modalImage={largeImg} />}
      <ToastContainer />
    </div>
  );
};

export default App;
