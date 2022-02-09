import { useRef } from "react";
import styles from "components/ImgUpload.module.css";

function ImgUpload({ imgUploadBtn, file, setFile }) {
  const { imgPreview } = styles;

  const imgInputRef = useRef(null);

  const onUploadBtnClicked = (event) => {
    const {
      target: { files },
    } = event;
    const file = files[0];
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      const {
        currentTarget: { result },
      } = event;
      console.log(event);
      setFile(result);
    };
    fileReader.onerror = (err) => console.error(err);
    fileReader.readAsDataURL(file);
  };

  const onButtonClick = (event) => {
    event.preventDefault();
    imgInputRef.current.click();
  };

  return (
    <>
      {file && (
        <div>
          <img src={file} alt="imgPreview" className={imgPreview} />
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        name="foodImg"
        onChange={onUploadBtnClicked}
        className={imgUploadBtn}
        ref={imgInputRef}
      ></input>
      <input type="button" onClick={onButtonClick} value="사진 업로드" />
    </>
  );
}

export default ImgUpload;
