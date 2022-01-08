import PropTypes from "prop-types";
import styles from "components/Item.module.css";
import { dbService } from "fb";
import { deleteDoc, doc, query } from "firebase/firestore";

function Item({ foodImg, id, menu, place, address, prevPrice, saledPrice }) {
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
    deleteBtn,
  } = styles;

  const onClick = async (event) => {
    if (window.confirm("ㄹㅇ 삭제할꺼?")) {
      const item = event.target.parentNode.parentNode.parentNode;
      const q = query(doc(dbService, "foods", `${id}`));
      item.remove();
      await deleteDoc(q);
      window.location.reload();
    } else {
      event.preventDefault();
    }
  };

  return (
    <div className={link}>
      <div className={item}>
        <img
          alt="img"
          className={img}
          src="https://i.stack.imgur.com/BwiAz.png"
        />
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
};

export default Item;
