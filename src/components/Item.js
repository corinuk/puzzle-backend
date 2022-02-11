import PropTypes from "prop-types";
import styles from "components/Item.module.css";
import { dbService, storageService } from "fb";
import { deleteDoc, doc, query } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

function Item({
  id,
  menu,
  place,
  address,
  prevPrice,
  saledPrice,
  deadline,
  fileURL,
  createdAt,
}) {
  const {
    link,
    img,
    item,
    details,
    detail,
    idClass,
    menuClass,
    placeClass,
    addressClass,
    prevPriceClass,
    saledPriceClass,
    deadlineClass,
    deleteBtn,
  } = styles;

  const onClick = async (event) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      const item = event.target.parentNode.parentNode.parentNode;
      item.remove();
      const q = query(doc(dbService, "foods", `${id}`));
      const fileRef = ref(storageService, `/images/${createdAt}`);
      await deleteObject(fileRef);
      await deleteDoc(q);
      window.location.reload();
    } else {
      event.preventDefault();
    }
  };

  return (
    <div className={link}>
      <div className={item}>
        <img alt="img" className={img} src={fileURL} />
        <div className={details}>
          <span className={`${detail} ${idClass}`}>id : {id}</span>
          <span className={`${detail} ${menuClass}`}>{menu}</span>
          <span className={`${detail} ${placeClass}`}>{place}</span>
          <span className={`${detail} ${addressClass}`}>{address}</span>
          <span className={`${detail} ${prevPriceClass}`}>
            원가 : {Number(`${prevPrice}`).toLocaleString("en")}원
          </span>
          <span className={`${detail} ${saledPriceClass}`}>
            할인가 : {Number(`${saledPrice}`).toLocaleString("en")}원
          </span>
          <span className={`${detail} ${deadlineClass}`}>
            마감시간 : {deadline}
          </span>
        </div>
        <button className={deleteBtn} onClick={onClick}>
          delete
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  menu: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  prevPrice: PropTypes.number.isRequired,
  saledPrice: PropTypes.number.isRequired,
  deadline: PropTypes.string.isRequired,
};

export default Item;
