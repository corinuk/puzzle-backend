import { dbService } from "fb";
import { storageService } from "fb";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import React, { useState } from "react";
import styles from "routes/PuzzleBackend.module.css";
import Upload from "components/Upload";
import AllItems from "components/AllItems";

function PuzzleBackend() {
  const [file, setFile] = useState(null);
  const [menu, setMenu] = useState("");
  const [place, setPlace] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [saledPrice, setSaledPrice] = useState("");
  const [ampm, setAmpm] = useState("");
  const [count, setCount] = useState("");
  const [deadlineHours, setDeadlineHours] = useState("");
  const [deadlineMinutes, setDeadlineMinutes] = useState("");

  const { uploadForm, submitBtn, imgUploadBtn } = styles;

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const createdAt = Date.now();
      const fileRef = ref(storageService, `/images/${createdAt}`);
      const response = await uploadString(fileRef, file, "data_url");
      const fileURL = await getDownloadURL(response.ref);
      await addDoc(collection(dbService, "foods"), {
        menu,
        place,
        address,
        price,
        saledPrice,
        ampm,
        count,
        deadlineHours,
        deadlineMinutes,
        createdAt,
        fileURL,
      });
      window.location.reload();
    } catch (error) {
      console.error("Error adding document: ", error);
    }
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
    } else if (name === "ampm") {
      setAmpm(value);
    } else if (name === "count") {
      setCount(value);
    } else if (name === "deadlineHours") {
      setDeadlineHours(value);
    } else if (name === "deadlineMinutes") {
      setDeadlineMinutes(value);
    }
  };

  return (
    <div>
      <h1>Puzzle Backend</h1>
      <Upload
        onSubmit={onSubmit}
        uploadForm={uploadForm}
        imgUploadBtn={imgUploadBtn}
        menu={menu}
        place={place}
        address={address}
        price={price}
        saledPrice={saledPrice}
        ampm={ampm}
        count={count}
        deadlineHours={deadlineHours}
        deadlineMinutes={deadlineMinutes}
        file={file}
        setFile={setFile}
        onChange={onChange}
        submitBtn={submitBtn}
      />
      <AllItems />
    </div>
  );
}

export default PuzzleBackend;
