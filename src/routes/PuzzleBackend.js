import { dbService } from "fb";
import { addDoc, collection } from "firebase/firestore";
import React, { useRef, useState } from "react";
import styles from "routes/PuzzleBackend.module.css";
import Upload from "components/Upload";
import AllItems from "components/AllItems";

function PuzzleBackend() {
  const [menu, setMenu] = useState("");
  const [place, setPlace] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [saledPrice, setSaledPrice] = useState("");

  const imgInputRef = useRef(null);

  const { uploadForm, submitBtn, imgUploadBtn } = styles;

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await addDoc(collection(dbService, "foods"), {
        menu,
        place,
        address,
        price,
        saledPrice,
        createdAt: Date.now(),
      });
      window.location.reload();
    } catch (error) {
      console.error("Error adding document: ", error);
    }

    setMenu("");
    setPlace("");
    setAddress("");
    setPrice("");
    setSaledPrice("");
  };
  const onUploadBtnClicked = (event) => {
    const img = event.target.files[0];
    console.log(event.target.files);
    const formData = new FormData();
    formData.append("file", img);
  };
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;

    if (name === "menu") {
      setMenu(value);
    } else if (name === "place") {
      setPlace(value);
    } else if (name === "address") {
      setAddress(value);
    } else if (name === "price") {
      setPrice(value);
    } else if (name === "saledPrice") {
      setSaledPrice(value);
    }
  };
  const onButtonClick = (event) => {
    event.preventDefault();
    imgInputRef.current.click();
  };

  return (
    <div>
      <h1>Puzzle Backend</h1>
      <Upload
        onSubmit={onSubmit}
        uploadForm={uploadForm}
        onUploadBtnClicked={onUploadBtnClicked}
        imgUploadBtn={imgUploadBtn}
        imgInputRef={imgInputRef}
        onButtonClick={onButtonClick}
        menu={menu}
        place={place}
        address={address}
        price={price}
        saledPrice={saledPrice}
        onChange={onChange}
        submitBtn={submitBtn}
      />
      <AllItems />
    </div>
  );
}

export default PuzzleBackend;
