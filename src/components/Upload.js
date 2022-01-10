import ImgUpload from "components/ImgUpload";

function Upload({
  onSubmit,
  uploadForm,
  onUploadBtnClicked,
  imgUploadBtn,
  onButtonClick,
  menu,
  place,
  address,
  price,
  saledPrice,
  deadline,
  file,
  setFile,
  onChange,
  submitBtn,
}) {
  return (
    <form onSubmit={onSubmit} className={uploadForm}>
      <ImgUpload
        onUploadBtnClicked={onUploadBtnClicked}
        imgUploadBtn={imgUploadBtn}
        onButtonClick={onButtonClick}
        file={file}
        setFile={setFile}
      />
      <input
        required
        name="menu"
        value={menu}
        onChange={onChange}
        type="text"
        placeholder="메뉴 이름"
      />
      <input
        required
        name="place"
        value={place}
        onChange={onChange}
        type="text"
        placeholder="가게 이름"
      />
      <input
        required
        name="address"
        value={address}
        onChange={onChange}
        type="text"
        placeholder="가게 주소"
      />
      <input
        required
        name="price"
        value={price}
        onChange={onChange}
        type="number"
        placeholder="원래 가격"
      />
      <input
        required
        name="saledPrice"
        value={saledPrice}
        onChange={onChange}
        type="number"
        placeholder="할인된 가격"
      />
      <input
        required
        name="deadline"
        value={deadline}
        onChange={onChange}
        type="text"
        placeholder="마감시간"
      />
      <input className={submitBtn} type="submit" value="올리기" />
    </form>
  );
}

export default Upload;
