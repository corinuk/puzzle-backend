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
  ampm,
  count,
  deadlineHours,
  deadlineMinutes,
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
        name="ampm"
        value={ampm}
        onChange={onChange}
        type="text"
        placeholder="오전 or 오후"
      />
      <input
        required
        name="count"
        value={count}
        onChange={onChange}
        type="number"
        placeholder="개수"
      />
      <input
        required
        name="deadlineHours"
        value={deadlineHours}
        onChange={onChange}
        type="text"
        placeholder="시"
      />
      <input
        required
        name="deadlineMinutes"
        value={deadlineMinutes}
        onChange={onChange}
        type="text"
        placeholder="분"
      />
      <input className={submitBtn} type="submit" value="올리기" />
    </form>
  );
}

export default Upload;
